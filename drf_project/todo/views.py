from django.shortcuts import render

# Create your views here.
from rest_framework.viewsets import ModelViewSet

from .models import Project,ToDo
from .serializers import ProjectModelSerializer,ToDoModelSerializer
from rest_framework.pagination import PageNumberPagination

# Create your views here.

class ProjectPagination(PageNumberPagination):
    page_size = 1

class ProjectModelViewSet(ModelViewSet):
    queryset = Project.objects.all()
    serializer_class = ProjectModelSerializer
    pagination_class = ProjectPagination
    def get_queryset(self):
        queryset = Project.objects.all()
        name = self.request.query_params.get('name', '')
        if name:
            queryset = queryset.filter(name__contains=name)
        return queryset


class ToDoModelViewSet(ModelViewSet):
    queryset = ToDo.objects.all()
    serializer_class = ToDoModelSerializer