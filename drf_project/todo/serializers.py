from rest_framework.serializers import ModelSerializer, StringRelatedField
from .models import Project, ToDo
from users.serializers import CustomUserModelSerializer


class ProjectModelSerializer(ModelSerializer):
    
    #users=CustomUserModelSerializer(many=True, read_only=True)
    
    class Meta:
        model = Project
        fields = '__all__'


class ProjectModelNewSerializer(ModelSerializer):
        
    class Meta:
        model = Project
        fields = ["name", "users"]


class ToDoModelSerializer(ModelSerializer):
    
    creator_user=CustomUserModelSerializer()
    
    class Meta:
        model = ToDo
        exclude = ('flag_is_active',)

class ToDoReadSerializer(ModelSerializer):

    project = StringRelatedField()
    creator = StringRelatedField()

    class Meta:
        model = ToDo
       # exclude = ('flag_is_active',)
        fields = '__all__'