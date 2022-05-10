from rest_framework.serializers import ModelSerializer
from .models import Project, ToDo
from users.serializers import CustomUserModelSerializer


class ProjectModelSerializer(ModelSerializer):
    
    users=CustomUserModelSerializer(many=True)
    
    class Meta:
        model = Project
        fields = '__all__'


class ToDoModelSerializer(ModelSerializer):
    
    creator_user=CustomUserModelSerializer()
    
    class Meta:
        model = ToDo
        exclude = ('flag_is_active',)