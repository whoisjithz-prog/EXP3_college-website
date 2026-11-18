from django.urls import path
from .views import (
    ChatSessionListCreateView, ChatSessionDetailView,
    ChatSessionMessagesView, AdminAnalyticsView
)

urlpatterns = [
    path('sessions/', ChatSessionListCreateView.as_view(), name='chat-sessions'),
    path('sessions/<uuid:pk>/', ChatSessionDetailView.as_view(), name='chat-session-detail'),
    path('sessions/<uuid:pk>/messages/', ChatSessionMessagesView.as_view(), name='chat-session-messages'),
    path('analytics/', AdminAnalyticsView.as_view(), name='chat-analytics'),
]
