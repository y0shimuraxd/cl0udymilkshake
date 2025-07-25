from django.contrib import admin
from django.urls import path, include
from rest_framework import routers
from events.views import EventViewSet, CategoryViewSet
from users.views import RegisterView, LoginView, LogoutView, UserView

router = routers.DefaultRouter()
router.register(r'events', EventViewSet)
router.register(r'categories', CategoryViewSet)

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include(router.urls)),
    path('api/register/', RegisterView.as_view(), name='register'),
    path('api/login/', LoginView.as_view(), name='login'),
    path('api/logout/', LogoutView.as_view(), name='logout'),
    path('api/me/', UserView.as_view(), name='me'),
]
