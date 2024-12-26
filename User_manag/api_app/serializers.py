from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Profile

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'password', 'email']


    def create(self, validated_data):
        print(validated_data)
        user = User.objects.create_user(**validated_data)
        print(f"serializer ---- data{user}")
        return user

class ProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = Profile
        fields = ['phone_number', 'address', 'gender', 'profile_picture']
    