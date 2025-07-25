from rest_framework import serializers
from rest_framework_gis.serializers import GeoModelSerializer
from .models import Event, Category
from geopy.geocoders import Nominatim
from django.contrib.gis.geos import Point

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = '__all__'

class EventSerializer(GeoModelSerializer):
    category = CategorySerializer(read_only=True)
    category_id = serializers.PrimaryKeyRelatedField(
        queryset=Category.objects.all(),
        source='category',
        write_only=True
    )

    class Meta:
        model = Event
        geo_field = 'location'
        fields = '__all__'
        read_only_fields = ('creator', 'status', 'created_at')

    def create(self, validated_data):
        # Геокодирование адреса
        geolocator = Nominatim(user_agent="city_events")
        location = geolocator.geocode(validated_data.get('address'))

        if location:
            validated_data['location'] = Point(location.longitude, location.latitude)
        else:
            # Если геокодирование не сработало, можно задать дефолт или вернуть ошибку
            raise serializers.ValidationError("Адрес не удалось определить на карте")

        # Устанавливаем создателя
        validated_data['creator'] = self.context['request'].user

        return super().create(validated_data)
