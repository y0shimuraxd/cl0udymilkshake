from django.db import models
from django.contrib.gis.db import models
from django.contrib.auth import get_user_model

User = get_user_model()

class Category(models.Model):
    name = models.CharField(max_length=100, unique=True)
    icon = models.CharField(max_length=30, blank=True)

    def __str__(self):
        return self.name

class Event(models.Model):
    STATUS_CHOICES = (
        ('pending', 'На модерации'),
        ('approved', 'Одобрено'),
        ('rejected', 'Отклонено'),
    )
    
    title = models.CharField(max_length=200)
    description = models.TextField()
    date = models.DateField()
    time = models.TimeField()
    address = models.CharField(max_length=255)
    location = models.PointField(srid=4326)  # Геополе
    category = models.ForeignKey(Category, on_delete=models.CASCADE)
    image = models.ImageField(upload_to='events/', blank=True, null=True)
    is_free = models.BooleanField(default=True)
    price = models.DecimalField(max_digits=8, decimal_places=2, null=True, blank=True)
    url = models.URLField(blank=True)
    creator = models.ForeignKey(User, on_delete=models.CASCADE)
    status = models.CharField(max_length=10, choices=STATUS_CHOICES, default='pending')
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title