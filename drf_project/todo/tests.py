from django.test import TestCase

# Create your tests here.
import json
from rest_framework import status
from rest_framework.test import APIRequestFactory, force_authenticate, APIClient, APISimpleTestCase, APITestCase
#from mixer.backend.django import mixer
from users.models import CustomUser
from .views import ProjectModelViewSet,ToDoModelViewSet
from .models import Project, ToDo
from django.test.client import Client

class TestProjectViewSet(TestCase):

    def test_get_list(self):
        factory = APIRequestFactory()
        request = factory.get('/api/projects/')
        admin = CustomUser.objects.create_superuser('admin', 'admin@admin.com', 'admin123456')
        force_authenticate(request, admin)
        view = ProjectModelViewSet.as_view({'get': 'list'})
        response = view(request)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_create_project(self):
        factory = APIRequestFactory()
        request = factory.post('/api/projects/', {'name': 'Project', 'repository': 'https://github.com/Vladimir218/DRF_project', 'Users': ' 46c00648-6e6f-4d7e-a7af-092d96b90a26, eeb4ab58-b39a-4f39-9704-bf51147ae175 '}, format='json')
        #admin = CustomUser.objects.create_superuser('admin', 'admin@admin.com', 'admin123456')
        #force_authenticate(request, admin)
        view = ProjectModelViewSet.as_view({'post': 'create'})
        response = view(request)
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)