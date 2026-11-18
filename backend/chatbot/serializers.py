from rest_framework import serializers
from .models import ChatSession, ChatMessage, ChatAuditLog

class ChatMessageSerializer(serializers.ModelSerializer):
    class Meta:
        model = ChatMessage
        fields = ['id', 'session', 'role', 'content', 'created_at', 'was_blocked', 'was_out_of_scope']

class ChatSessionSerializer(serializers.ModelSerializer):
    messages = ChatMessageSerializer(many=True, read_only=True)
    message_count = serializers.SerializerMethodField()

    class Meta:
        model = ChatSession
        fields = ['id', 'anonymous_token', 'title', 'created_at', 'updated_at', 'messages', 'message_count']

    def get_message_count(self, obj):
        return obj.messages.count()

class ChatAuditLogSerializer(serializers.ModelSerializer):
    class Meta:
        model = ChatAuditLog
        fields = '__all__'
