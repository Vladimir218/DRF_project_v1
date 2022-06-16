from rest_framework.serializers import HyperlinkedModelSerializer
from rest_framework import serializers
from .models import CustomUser


class CustomUserModelSerializer(HyperlinkedModelSerializer): 
    class Meta:
        model = CustomUser
        fields = ["username", "first_name", "last_name", "email"]


class CustomUserNewModelSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ["username", "first_name", "last_name", "email","is_staff","is_active"]

