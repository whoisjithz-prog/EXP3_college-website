from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/college/', include('college_site.urls')),
    path('api/kb/', include('knowledge.urls')),
    path('api/chat/', include('chatbot.urls')),
]
