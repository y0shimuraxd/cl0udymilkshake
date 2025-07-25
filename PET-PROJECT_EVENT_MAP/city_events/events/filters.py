import django_filters
from django.contrib.gis.geos import Polygon
from .models import Event

class EventFilter(django_filters.FilterSet):
    bbox = django_filters.CharFilter(method='filter_bbox')
    date_from = django_filters.DateFilter(field_name='date', lookup_expr='gte')
    date_to = django_filters.DateFilter(field_name='date', lookup_expr='lte')
    category = django_filters.NumberFilter(field_name='category_id')
    is_free = django_filters.BooleanFilter(field_name='is_free')

    class Meta:
        model = Event
        fields = []

    def filter_bbox(self, queryset, name, value):
        try:
            coords = [float(c) for c in value.split(',')]
            bbox = Polygon.from_bbox((coords[0], coords[1], coords[2], coords[3]))
            return queryset.filter(location__within=bbox)
        except (ValueError, TypeError):
            return queryset