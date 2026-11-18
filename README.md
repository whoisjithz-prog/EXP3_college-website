# Riverview College - Website with LLM-Powered Chatbot

A modern, responsive College Management Website integrated with a Google Gemini LLM-powered AI Chatbot built strictly according to the Software Requirements Specification (SRS) and UI design.

![Riverview College](https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1200&q=80)

---

## 🏛️ Project Overview

- **Frontend:** ReactJS (Vite, Tailwind CSS, Lucide Icons)
- **Backend:** Python 3, Django, Django REST Framework, SQLite
- **LLM Core:** Google Gemini (`gemini-3.5-flash`) via REST API
- **Tone & Persona:** Warm, cheerful, and encouraging per SRS Section 5
- **Security Guardrails:** Identity protection (never reveals underlying model/vendor), out-of-scope question deflection, and official contact fallback grounding.

---

## 🌟 Key Features

1. **Homepage:**
   - Hero banner: *"Learn. Grow. Belong."* with yellow sparkle accent and high-res collaborative student imagery.
   - 4 Institutional Highlights: Top-Ranked Programs, Vibrant Campus Community, Exceptional Faculty, Global Opportunities.
   - Latest News & Upcoming Events: *"Riverview College Hosts Annual Innovation Summit"* & *"Career Fair 2025"*.
   - Floating Chatbot Button (*"Chat with us!"*).

2. **Dedicated Chat View ("Ask. Learn. Explore."):**
   - Soft illustrated campus background with clocktower and tree leaves.
   - Handwritten cursive calligraphy with playful yellow brush-stroke underline.
   - Interactive chat window with Riverview's cute robot assistant avatar.
   - Suggested starter query chips & multi-turn conversation memory.
   - Conversation history drawer to manage, resume, or delete chat sessions.

3. **Academic Programs & Courses:**
   - B.Sc. Computer Science, B.Tech AI & Data Science, MBA, BBA, M.Sc. Data Science, B.A. Journalism, B.Sc. Biotechnology.
   - Detailed eligibility, annual fee structure, duration, and seat availability.

4. **Admin Dashboard & Knowledge Base Manager:**
   - Full CRUD on knowledge base entries that ground Gemini's answers.
   - Real-time chat analytics: total sessions, user messages, blocked injection attempts, top inquired topics, and audit logs.

---

## 🚀 Getting Started

### 1. Prerequisites
- Python 3.10+
- Node.js 18+ and npm

### 2. Backend Setup
```bash
cd backend
pip install -r requirements.txt

# Run migrations
python manage.py makemigrations
python manage.py migrate

# Seed imaginary college data & knowledge base
python seed_data.py

# Start Django development server
python manage.py runserver 127.0.0.1:8000
```
Backend will be live at `http://127.0.0.1:8000/`.

### 3. Frontend Setup
```bash
cd frontend
npm install

# Start Vite React server
npm run dev
```
Frontend will be live at `http://127.0.0.1:5173/`.

---

## 📜 SRS Specification Alignment
- **FR-CB-01 to FR-CB-10:** AI chatbot core with Gemini 3.5 Flash, multi-turn history, typing indicators, and starter questions.
- **FR-SEC-01 to FR-SEC-07:** Identity masking, system prompt confidentiality, prompt-injection defense, and audit logging.
- **FR-KB-01 to FR-KB-05:** Dynamic Knowledge Base feeding grounding context to Gemini in real time without redeployment.
