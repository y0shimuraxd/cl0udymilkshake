from django.shortcuts import render
from rest_framework import viewsets, filters
from django_filters.rest_framework import DjangoFilterBackend
from .models import Event, Category
from .serializers import EventSerializer, CategorySerializer
from .filters import EventFilter

class EventViewSet(viewsets.ModelViewSet):
    queryset = Event.objects.filter(status='approved')
    serializer_class = EventSerializer
    filter_backends = [DjangoFilterBackend, filters.SearchFilter]
    filterset_class = EventFilter
    search_fields = ['title', 'description', 'address']

    def perform_create(self, serializer):
        serializer.save(creator=self.request.user)

class CategoryViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer
# Create your views here.
