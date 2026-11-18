from django.urls import path
from .views import (
    DepartmentListView, CourseListView, FacultyListView,
    EventListView, NoticeListView, PlacementListView,
    FacilityListView, SiteSearchView
)

urlpatterns = [
    path('departments/', DepartmentListView.as_view(), name='departments-list'),
    path('courses/', CourseListView.as_view(), name='courses-list'),
    path('faculty/', FacultyListView.as_view(), name='faculty-list'),
    path('events/', EventListView.as_view(), name='events-list'),
    path('notices/', NoticeListView.as_view(), name='notices-list'),
    path('placements/', PlacementListView.as_view(), name='placements-list'),
    path('facilities/', FacilityListView.as_view(), name='facilities-list'),
    path('search/', SiteSearchView.as_view(), name='site-search'),
]
