from django.urls import path
from .views import KnowledgeEntryListCreateView, KnowledgeEntryDetailView

urlpatterns = [
    path('entries/', KnowledgeEntryListCreateView.as_view(), name='kb-entries'),
    path('entries/<int:pk>/', KnowledgeEntryDetailView.as_view(), name='kb-entry-detail'),
]
