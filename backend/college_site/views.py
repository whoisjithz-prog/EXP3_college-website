from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import Department, Course, Faculty, Event, Notice, PlacementStatistic, Facility
from .serializers import (
    DepartmentSerializer, CourseSerializer, FacultySerializer,
    EventSerializer, NoticeSerializer, PlacementStatisticSerializer, FacilitySerializer
)

class DepartmentListView(APIView):
    def get(self, request):
        departments = Department.objects.prefetch_related('courses').all()
        serializer = DepartmentSerializer(departments, many=True)
        return Response(serializer.data)

class CourseListView(APIView):
    def get(self, request):
        courses = Course.objects.select_related('department').all()
        degree = request.query_params.get('degree')
        if degree:
            courses = courses.filter(degree_level__iexact=degree)
        serializer = CourseSerializer(courses, many=True)
        return Response(serializer.data)

class FacultyListView(APIView):
    def get(self, request):
        faculty = Faculty.objects.select_related('department').all()
        serializer = FacultySerializer(faculty, many=True)
        return Response(serializer.data)

class EventListView(APIView):
    def get(self, request):
        events = Event.objects.all()
        featured = request.query_params.get('featured')
        if featured == 'true':
            events = events.filter(is_featured=True)
        serializer = EventSerializer(events, many=True)
        return Response(serializer.data)

class NoticeListView(APIView):
    def get(self, request):
        notices = Notice.objects.all()
        serializer = NoticeSerializer(notices, many=True)
        return Response(serializer.data)

class PlacementListView(APIView):
    def get(self, request):
        stats = PlacementStatistic.objects.first()
        if stats:
            return Response(PlacementStatisticSerializer(stats).data)
        return Response({})

class FacilityListView(APIView):
    def get(self, request):
        facilities = Facility.objects.all()
        serializer = FacilitySerializer(facilities, many=True)
        return Response(serializer.data)

class SiteSearchView(APIView):
    def get(self, request):
        q = request.query_params.get('q', '').strip()
        if not q:
            return Response({'courses': [], 'events': [], 'notices': []})
        
        courses = Course.objects.filter(name__icontains=q) | Course.objects.filter(overview__icontains=q)
        events = Event.objects.filter(title__icontains=q) | Event.objects.filter(description__icontains=q)
        notices = Notice.objects.filter(title__icontains=q) | Notice.objects.filter(content__icontains=q)

        return Response({
            'courses': CourseSerializer(courses[:5], many=True).data,
            'events': EventSerializer(events[:5], many=True).data,
            'notices': NoticeSerializer(notices[:5], many=True).data,
        })
