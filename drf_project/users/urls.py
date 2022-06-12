from django.urls import path
from .views import CustomUserModelViewSet

app_name = 'users'
urlpatterns = [
    path('', CustomUserModelViewSet.as_view({'get': 'list'})),
]