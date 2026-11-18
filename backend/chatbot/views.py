import uuid
from django.shortcuts import get_object_or_404
from django.db.models import Count, Q
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

from .models import ChatSession, ChatMessage, ChatAuditLog
from .serializers import ChatSessionSerializer, ChatMessageSerializer, ChatAuditLogSerializer
from .gemini_service import generate_college_reply
from knowledge.models import KnowledgeEntry

class ChatSessionListCreateView(APIView):
    def get(self, request):
        anonymous_token = request.query_params.get('anonymous_token', '').strip()
        if not anonymous_token:
            return Response([], status=status.HTTP_200_OK)
        
        sessions = ChatSession.objects.filter(anonymous_token=anonymous_token).prefetch_related('messages')
        serializer = ChatSessionSerializer(sessions, many=True)
        return Response(serializer.data)

    def post(self, request):
        anonymous_token = request.data.get('anonymous_token', '').strip()
        if not anonymous_token:
            anonymous_token = str(uuid.uuid4())
            
        title = request.data.get('title', 'New Conversation').strip()
        session = ChatSession.objects.create(
            anonymous_token=anonymous_token,
            title=title or 'New Conversation'
        )
        return Response(ChatSessionSerializer(session).data, status=status.HTTP_201_CREATED)

class ChatSessionDetailView(APIView):
    def get(self, request, pk):
        session = get_object_or_404(ChatSession, pk=pk)
        return Response(ChatSessionSerializer(session).data)

    def delete(self, request, pk):
        session = get_object_or_404(ChatSession, pk=pk)
        session.delete()
        return Response({'message': 'Conversation deleted successfully'}, status=status.HTTP_200_OK)

class ChatSessionMessagesView(APIView):
    def get(self, request, pk):
        session = get_object_or_404(ChatSession, pk=pk)
        messages = session.messages.all().order_by('created_at')
        serializer = ChatMessageSerializer(messages, many=True)
        return Response(serializer.data)

    def post(self, request, pk):
        session = get_object_or_404(ChatSession, pk=pk)
        raw_message = request.data.get('message', '').strip()
        
        if not raw_message:
            return Response({'error': 'Message cannot be empty.'}, status=status.HTTP_400_BAD_REQUEST)
        
        if len(raw_message) > 1000:
            return Response({'error': 'Message exceeds 1,000 character limit.'}, status=status.HTTP_400_BAD_REQUEST)

        # 1. Save user message
        user_msg = ChatMessage.objects.create(
            session=session,
            role='user',
            content=raw_message
        )

        # If this is the first message in the session, name the session
        if session.messages.count() <= 2 and (session.title == 'New Conversation' or not session.title):
            summary_title = raw_message[:35] + ('...' if len(raw_message) > 35 else '')
            session.title = summary_title
            session.save(update_fields=['title', 'updated_at'])

        # 2. Fetch recent conversation history
        history = list(session.messages.exclude(id=user_msg.id).order_by('created_at'))

        # 3. Call Gemini service
        gemini_result = generate_college_reply(
            session=session,
            user_message=raw_message,
            history_messages=history
        )

        # 4. Save assistant response
        assistant_msg = ChatMessage.objects.create(
            session=session,
            role='assistant',
            content=gemini_result['text'],
            was_blocked=gemini_result.get('was_blocked', False),
            was_out_of_scope=gemini_result.get('was_out_of_scope', False)
        )

        # 5. Record Audit Log for Admin analytics
        ChatAuditLog.objects.create(
            session_id=str(session.id),
            user_query=raw_message,
            bot_response=gemini_result['text'][:500],
            is_blocked=gemini_result.get('was_blocked', False),
            is_out_of_scope=gemini_result.get('was_out_of_scope', False)
        )

        return Response({
            'user_message': ChatMessageSerializer(user_msg).data,
            'assistant_message': ChatMessageSerializer(assistant_msg).data
        }, status=status.HTTP_201_CREATED)

class AdminAnalyticsView(APIView):
    def get(self, request):
        total_sessions = ChatSession.objects.count()
        total_messages = ChatMessage.objects.count()
        total_user_queries = ChatMessage.objects.filter(role='user').count()
        blocked_count = ChatMessage.objects.filter(was_blocked=True).count()
        out_of_scope_count = ChatMessage.objects.filter(was_out_of_scope=True).count()
        
        # Knowledge Base counts
        total_kb_entries = KnowledgeEntry.objects.count()
        published_kb = KnowledgeEntry.objects.filter(is_published=True).count()

        recent_logs = ChatAuditLog.objects.all()[:15]
        
        # Most popular question topics
        sample_queries = ChatMessage.objects.filter(role='user').values_list('content', flat=True)[:100]
        keywords_frequency = {}
        target_words = ['fees', 'admission', 'course', 'b.sc', 'bba', 'mba', 'hostel', 'placement', 'scholarship', 'event']
        for q in sample_queries:
            q_low = q.lower()
            for word in target_words:
                if word in q_low:
                    keywords_frequency[word] = keywords_frequency.get(word, 0) + 1

        top_topics = [
            {'topic': k.capitalize(), 'count': v}
            for k, v in sorted(keywords_frequency.items(), key=lambda x: x[1], reverse=True)
        ]

        return Response({
            'total_sessions': total_sessions,
            'total_messages': total_messages,
            'total_user_queries': total_user_queries,
            'blocked_count': blocked_count,
            'out_of_scope_count': out_of_scope_count,
            'total_kb_entries': total_kb_entries,
            'published_kb': published_kb,
            'top_topics': top_topics,
            'recent_logs': ChatAuditLogSerializer(recent_logs, many=True).data
        })
