"""drf_project URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import include, path, re_path
from rest_framework.routers import DefaultRouter

from graphene_django.views import GraphQLView

from users.views import CustomUserModelViewSet
from todo.views import ProjectModelViewSet, ToDoModelViewSet
from rest_framework.authtoken import views
from drf_yasg.views import get_schema_view
from drf_yasg import openapi
from rest_framework import permissions


schema_view = get_schema_view(
   openapi.Info(
      title="ToDo",
      default_version='0.1',
      description="Documentation to out project",
      contact=openapi.Contact(email="KVV@admin.local"),
      license=openapi.License(name="MIT License"),
   ),
   public=True,
   permission_classes=[permissions.AllowAny],
)

router = DefaultRouter()
router.register("users", CustomUserModelViewSet)
router.register("todos", ToDoModelViewSet)
router.register("projects", ProjectModelViewSet)

urlpatterns = [
    path("admin/", admin.site.urls),
    path("api-auth", include("rest_framework.urls")),
    path('/', views.obtain_auth_token),
    path('api/users/0.1', include('users.urls', namespace='0.1')), #NamespaceVersioning
    path('api/users/0.2', include('users.urls', namespace='0.2')), #NamespaceVersioning
    #re_path(r'^api/(?P<version>\d\.\d)/users/$', CustomUserModelViewSet.as_view({'get': 'list'})), #UrlPathVersioning
    path("api/", include(router.urls)),
    path('api-token-auth/', views.obtain_auth_token),
    path("graphql/", GraphQLView.as_view(graphiql=True)),
    re_path(r'^swagger(?P<format>\.json|\.yaml)$', schema_view.without_ui(cache_timeout=0), name='schema-json'),
    path('swagger/', schema_view.with_ui('swagger', cache_timeout=0), name='schema-swagger-ui'),
    path('redoc/', schema_view.with_ui('redoc', cache_timeout=0), name='schema-redoc'),
]
