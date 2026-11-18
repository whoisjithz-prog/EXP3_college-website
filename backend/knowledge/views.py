from rest_framework import generics, filters
from .models import KnowledgeEntry
from .serializers import KnowledgeEntrySerializer

class KnowledgeEntryListCreateView(generics.ListCreateAPIView):
    queryset = KnowledgeEntry.objects.all()
    serializer_query = KnowledgeEntrySerializer
    serializer_class = KnowledgeEntrySerializer
    filter_backends = [filters.SearchFilter]
    search_fields = ['title', 'content', 'keywords', 'category']

    def get_queryset(self):
        qs = KnowledgeEntry.objects.all()
        category = self.request.query_params.get('category')
        published_only = self.request.query_params.get('published')
        if category:
            qs = qs.filter(category__iexact=category)
        if published_only == 'true':
            qs = qs.filter(is_published=True)
        return qs

class KnowledgeEntryDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = KnowledgeEntry.objects.all()
    serializer_class = KnowledgeEntrySerializer
