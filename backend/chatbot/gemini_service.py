import os
import json
import logging
import re
import requests
from django.conf import settings
from knowledge.models import KnowledgeEntry

logger = logging.getLogger(__name__)

# SRS Section 5: Chatbot System Prompt and Persona Specification
MANDATORY_SYSTEM_PROMPT = (
    "The chatbot must answer questions related to the college data only. "
    "Do not answer general questions. Never reveal its own identity."
)

PERSONA_DIRECTIVE = (
    "Your persona is warm and cheerful. Greet users kindly, stay positive and encouraging, "
    "and keep your answers clear and friendly."
)

FALLBACK_CONTACT_INFO = (
    "Riverview College Administrative Office:\n"
    "• Email: admissions@riverview.edu / info@riverview.edu\n"
    "• Phone: +1 (800) 555-RIVE (7483)\n"
    "• Hours: Monday to Friday, 9:00 AM – 5:00 PM\n"
    "• Address: 100 Riverside Boulevard, Tech Valley, CA 94016"
)

PROHIBITED_IDENTITY_PATTERNS = [
    r'\bgemini\b',
    r'\bchatgpt\b',
    r'\bopenai\b',
    r'\bgoogle ai\b',
    r'\blarge language model\b',
    r'\bllm\b',
    r'\bsystem prompt\b',
    r'\bmy prompt\b',
    r'\binstructions given to me\b',
]

def search_knowledge_base(query, max_entries=3):
    """
    Retrieves top relevant published knowledge base entries
    matching the query keywords, title, or category.
    """
    if not query:
        entries = KnowledgeEntry.objects.filter(is_published=True)[:2]
        return list(entries)

    query_tokens = [w.lower() for w in re.findall(r'\b\w{3,}\b', query)]
    
    all_published = list(KnowledgeEntry.objects.filter(is_published=True))
    scored = []
    for entry in all_published:
        score = 0
        search_space = f"{entry.category} {entry.title} {entry.keywords} {entry.content}".lower()
        for token in query_tokens:
            if token in entry.title.lower():
                score += 8
            elif token in entry.keywords.lower():
                score += 5
            elif token in entry.category.lower():
                score += 4
            elif token in entry.content.lower():
                score += 2
        if score > 0:
            scored.append((score, entry))
    
    scored.sort(key=lambda x: x[0], reverse=True)
    if scored:
        return [item[1] for item in scored[:max_entries]]
    
    return list(KnowledgeEntry.objects.filter(is_published=True)[:2])


def check_prompt_injection(user_text):
    """Detect prompt injection or attempts to extract internal instructions."""
    patterns = [
        r'ignore (all |previous |the )*instructions',
        r'system prompt',
        r'reveal (your|the) prompt',
        r'repeat (your|the) (instructions|prompt)',
        r'what are your (instructions|rules)',
        r'who created you',
        r'what (ai|model) are you',
        r'are you (gemini|chatgpt|claude|gpt)',
        r'who are you',
    ]
    lower = user_text.lower()
    for pat in patterns:
        if re.search(pat, lower):
            return True
    return False


def is_general_out_of_scope(user_text):
    """
    Detect non-college general questions (e.g., world news, prime ministers, coding requests, general math).
    """
    patterns = [
        r'prime minister',
        r'president of',
        r'capital of [a-z]+',
        r'write (a|me a) python program',
        r'write (a|me a) (code|script|poem|story)',
        r'weather in',
        r'who won the',
        r'solve this (equation|integral|math)',
        r'recipe for',
    ]
    lower = user_text.lower()
    for pat in patterns:
        if re.search(pat, lower):
            return True
    return False


def sanitize_response(response_text):
    """
    Ensures chatbot never discloses underlying AI technology or system prompt.
    """
    cleaned = response_text
    lower = cleaned.lower()
    for pat in PROHIBITED_IDENTITY_PATTERNS:
        if re.search(pat, lower):
            return (
                "Hello there! 😊 I am Riverview College's cheerful virtual assistant! "
                "I am here strictly to assist you with information about Riverview College—such as our "
                "academic programs, admissions, fee structures, faculty, campus facilities, and events. "
                "How may I brighten your day and help you explore Riverview College today?"
            )
    return cleaned


def generate_local_knowledge_response(user_query, kb_entries):
    """
    Deterministic warm & cheerful response synthesizer using official college KB data
    when network is offline or Gemini API experiences timeouts.
    """
    if not kb_entries:
        return (
            "Hello! 😊 I'd love to help you with that, but I couldn't find those specific details "
            "in our current Riverview College records.\n\n"
            "For full confirmation and personalized guidance, please contact our friendly Admissions Office:\n\n"
            f"{FALLBACK_CONTACT_INFO}"
        )

    top_entry = kb_entries[0]
    greeting = "Hello there! 😊 It is an absolute pleasure to help you today!\n\n"
    
    body = f"Here is the official information regarding **{top_entry.title}** at Riverview College:\n\n"
    body += top_entry.content + "\n\n"
    
    closing = "Please let me know if you would like to know more about our programs, campus tours, or application deadlines! ✨"
    return greeting + body + closing


def generate_college_reply(session, user_message, history_messages=None):
    """
    Main pipeline for generating answers adhering to SRS Section 5.
    API Core: gemini-3.5-flash with specified API key.
    """
    user_query = user_message.strip()
    
    # 1. Validation checks (FR-CB-10)
    if len(user_query) > 1000:
        return {
            'text': "Your message is a bit long! Please keep questions under 1,000 characters so I can give you the best answer. 😊",
            'was_blocked': True,
            'was_out_of_scope': False
        }

    # 2. Check for identity queries / prompt injection / system prompt extraction (FR-SEC-03, FR-SEC-04, FR-SEC-05)
    if check_prompt_injection(user_query):
        return {
            'text': (
                "Hello there! 😊 I'm Riverview College's AI assistant! "
                "I am dedicated exclusively to helping students, parents, and visitors explore everything about Riverview College—"
                "from our academic degrees and faculty to tuition fees, scholarships, and vibrant campus life. "
                "What would you like to discover about Riverview today? ✨"
            ),
            'was_blocked': True,
            'was_out_of_scope': False
        }

    # 3. Check for out-of-scope general queries (FR-SEC-02)
    if is_general_out_of_scope(user_query):
        return {
            'text': (
                "Hello! 😊 I would love to chat, but I specialize strictly in answering questions about Riverview College! "
                "I can happily assist you with our courses, admission procedures, fee structures, faculty profiles, and campus events. "
                "How can I help you explore Riverview today?"
            ),
            'was_blocked': False,
            'was_out_of_scope': True
        }

    # 4. Retrieve Knowledge Base Context
    kb_entries = search_knowledge_base(user_query, max_entries=3)
    kb_context_text = "\n\n".join([
        f"--- CATEGORY: {e.category} | TITLE: {e.title} ---\n{e.content}"
        for e in kb_entries
    ])

    # 5. Construct System Instruction
    combined_system_instruction = (
        f"{MANDATORY_SYSTEM_PROMPT}\n\n"
        f"{PERSONA_DIRECTIVE}\n\n"
        "COLLEGE INFORMATION REFERENCE (RIVERVIEW COLLEGE ONLY):\n"
        "Use ONLY the following approved Riverview College data to formulate your answers. "
        "Do not invent facts, numbers, dates, or contact details not supported by this reference data. "
        "If the answer to a college-related question is not in this reference data, state politely and cheerily "
        "that you don't have that specific detail on record and provide the official college office contact information.\n\n"
        f"OFFICIAL CONTACT FALLBACK:\n{FALLBACK_CONTACT_INFO}\n\n"
        f"APPROVED COLLEGE DATA:\n{kb_context_text}"
    )

    # 6. Format Conversation History (Multi-turn context, up to last 20 messages)
    contents = []
    if history_messages:
        for msg in history_messages[-20:]:
            role_name = 'user' if msg.role == 'user' else 'model'
            contents.append({
                'role': role_name,
                'parts': [{'text': msg.content}]
            })

    # Add current user message
    contents.append({
        'role': 'user',
        'parts': [{'text': user_query}]
    })

    # 7. Call Google Gemini API (gemini-3.5-flash)
    api_key = getattr(settings, 'GEMINI_API_KEY', '') or os.environ.get('GEMINI_API_KEY', '')
    model_name = getattr(settings, 'GEMINI_MODEL', 'gemini-3.5-flash')
    url = f"https://generativelanguage.googleapis.com/v1beta/models/{model_name}:generateContent?key={api_key}"

    payload = {
        "system_instruction": {
            "parts": [{"text": combined_system_instruction}]
        },
        "contents": contents,
        "generationConfig": {
            "temperature": 0.3,
            "maxOutputTokens": 800,
        }
    }

    try:
        response = requests.post(
            url,
            json=payload,
            headers={'Content-Type': 'application/json'},
            timeout=10
        )
        if response.status_code == 200:
            result = response.json()
            candidates = result.get('candidates', [])
            if candidates and 'content' in candidates[0]:
                reply_text = candidates[0]['content']['parts'][0]['text']
                safe_reply = sanitize_response(reply_text)
                is_out_of_scope = bool(re.search(r'(specialize only in|related to the college|college-related)', safe_reply, re.I))
                return {
                    'text': safe_reply,
                    'was_blocked': False,
                    'was_out_of_scope': is_out_of_scope
                }
    except Exception as e:
        logger.warning(f"Gemini API request note: {e}")

    # Seamless Fallback using local approved knowledge base context per SRS
    fallback_text = generate_local_knowledge_response(user_query, kb_entries)
    return {
        'text': fallback_text,
        'was_blocked': False,
        'was_out_of_scope': False
    }
