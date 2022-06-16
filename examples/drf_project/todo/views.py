from django.shortcuts import render

# Create your views here.
from rest_framework.viewsets import ModelViewSet
from rest_framework import permissions
from .models import Project,ToDo
from .serializers import ProjectModelSerializer,ToDoModelSerializer, ToDoReadSerializer,ProjectModelNewSerializer
from rest_framework.pagination import PageNumberPagination
from rest_framework.response import Response
from rest_framework import status
from django_filters.rest_framework import DjangoFilterBackend
# Create your views here.

class ProjectPagination(PageNumberPagination):
    page_size = 3


class ProjectModelViewSet(ModelViewSet):
    permission_classes = [permissions.IsAuthenticated]
    queryset = Project.objects.all()
    serializer_class = ProjectModelSerializer
    pagination_class = ProjectPagination

    def get_serializer_class(self):
        if self.request.version == '2.0':
            return ProjectModelNewSerializer
        return ProjectModelSerializer


    def get_queryset(self):
        queryset = Project.objects.all()
        name = self.request.query_params.get('name', '')
        if name:
            queryset = queryset.filter(name__contains=name)
        return queryset


class ToDoPagination(PageNumberPagination):
    page_size = 20


class ToDoModelViewSet(ModelViewSet):
    permission_classes = [permissions.IsAuthenticated]
    queryset = ToDo.objects.all()
    serializer_class = ToDoModelSerializer
    pagination_class = ToDoPagination
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['project']

    def get_serializer_class(self):
        if self.request.method in ['GET']:
            return ToDoReadSerializer
        return ToDoModelSerializer
    
    def destroy(self, request, pk=None):
        try:
            instance = self.get_object()
            instance.flag_is_active = False
            instance.save()
        except:
            return Response(status=status.HTTP_404_NOT_FOUND)
        else:
            return Response(status=status.HTTP_204_NO_CONTENT)