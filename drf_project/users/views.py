from rest_framework.viewsets import ModelViewSet
from rest_framework import permissions

from .models import CustomUser
from .serializers import CustomUserModelSerializer

from rest_framework import mixins
from rest_framework import viewsets

# Create your views here.


class CustomUserModelViewSet(mixins.ListModelMixin,
                  mixins.RetrieveModelMixin,
                  mixins.CreateModelMixin,
                  mixins.UpdateModelMixin,
                  viewsets.GenericViewSet):
    permission_classes = [permissions.IsAuthenticated]
    queryset = CustomUser.objects.all()
    serializer_class = CustomUserModelSerializer

