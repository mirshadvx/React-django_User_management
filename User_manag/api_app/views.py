from django.shortcuts import get_object_or_404
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import AllowAny, IsAuthenticated, IsAdminUser
from rest_framework import status
from django.db import transaction
from .serializers import UserSerializer, ProfileSerializer
from .models import Profile
from django.contrib.auth.models import User

class RegisterUserAPIView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        user_serializer = UserSerializer(data=request.data)
        print(user_serializer)
        if user_serializer.is_valid():
            user = user_serializer.save()
            profile_data = {
                'phone_number': request.data.get('phone'),
            }
            profile_serializer = ProfileSerializer(data=profile_data)
            if profile_serializer.is_valid():
                profile_serializer.save(user=user)
                print(f"serializer userrrr ---{user}")
                response_data = {
                    'user': user_serializer.data,
                    'profile': profile_serializer.data,
                }
                return Response(response_data, status=status.HTTP_201_CREATED)

            return Response(profile_serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        return Response(user_serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        
class user_details(APIView):
    permission_classes = [IsAuthenticated]
    # permission_classes = [AllowAny]

    def get(self, request):
        user = request.user 
        profile = user.profile
        print(user)

        user_data = {
            "username": user.username,
            "email": user.email,
            "phone_number": profile.phone_number,
            "address": profile.address,
            "gender": profile.gender,
            "profile_picture": request.build_absolute_uri(profile.profile_picture.url) if profile.profile_picture else None,
        }

        return Response(user_data)
            

    def patch(self, request):
        
        user = request.user
        profile = user.profile
        print(profile)

        data = request.data
        username = data.get("username")
        
        if username:
            user.username = username
            user.save()

        phone_number = data.get("phone_number")
        address = data.get("address")
        gender = data.get("gender")
        profile_picture = data.get("profile_picture")

        if phone_number:
            profile.phone_number = phone_number
        if address:
            profile.address = address
        if gender:
            profile.gender = gender
        if profile_picture:
            profile.profile_picture = profile_picture

        profile.save()

        user_data = {
            "username": user.username,
            "email": user.email,
            "phone_number": profile.phone_number,
            "address": profile.address,
            "gender": profile.gender,
            "profile_picture": request.build_absolute_uri(profile.profile_picture.url) if profile.profile_picture else None,
        }

        return Response(user_data, status=status.HTTP_200_OK)


class Test(APIView):
    permission_classes = [AllowAny]

    def get(self, request):
        print("its Test path mahnnnn")
        return Response("got mahmmmmmmmm")

class Users_List(APIView):
    permission_classes = [IsAdminUser,IsAuthenticated]
    # permission_classes = [AllowAny]

    def get(self, request):
        users_data = []
        profiles = Profile.objects.select_related('user').all()

        for profile in profiles:
            user_data = {
                "id": profile.user.id,
                "username": profile.user.username,
                "email": profile.user.email,
                "phone_number": profile.phone_number,
                "address": profile.address,
                "gender": profile.gender,
                "profile_picture": request.build_absolute_uri(profile.profile_picture.url)
                if profile.profile_picture else None,
            }
            users_data.append(user_data)

        return Response(users_data, status=status.HTTP_200_OK)
    
class update_user(APIView):
    permission_classes = [IsAuthenticated, IsAdminUser]
    # permission_classes = [AllowAny]

    def patch(self, request, user_id):
        try:
            print(request.data)
            user = User.objects.get(id=user_id)
            user_serializer = UserSerializer(user, data=request.data, partial=True)
            if user_serializer.is_valid():
                user = user_serializer.save()
                print(user)
                proflle_data = {
                    'phone_number' : request.data.get('phone_number'),
                    'address' : request.data.get('address'),
                    }
                
                profile = Profile.objects.get(user=user)
                profile_seri = ProfileSerializer(profile, data=proflle_data, partial = True)
                if profile_seri.is_valid():
                    profile_seri.save()
                    response_data = {
                        'user' : user_serializer.data,
                        'profile' : profile_seri.data,
                    }
                return Response(response_data, status=status.HTTP_200_OK)
            return Response(user_serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        except User.DoesNotExist:
            return Response({"detail": "User not found"}, status=status.HTTP_404_NOT_FOUND)
        
    def delete(self, request, user_id):
        permission_classes = [IsAuthenticated, IsAdminUser]
        user = User.objects.get(id=user_id)
        print(f"delete user {user}")
        try:
            user.delete()
            return Response({"message": "User deleted successfully."}, status=status.HTTP_204_NO_CONTENT)
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)
        
   