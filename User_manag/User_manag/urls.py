"""
URL configuration for User_manag project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.1/topics/http/urls/
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
from django.urls import path, include
from api_app import views
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path('admin/', admin.site.urls),
    path("api/user/register/",views.RegisterUserAPIView.as_view(), name="register-user"),
    path("api/token/",TokenObtainPairView.as_view(), name="get_token"),
    path("api/token/refresh/", TokenRefreshView.as_view(), name="refresh"),
    path("api-auth/", include("rest_framework.urls")),
    # path("test/", views.Test.as_view(),name="test"),
    path("user/details/",views.user_details.as_view(), name="user-details"),
    path("api/admin/users/",views.Users_List.as_view(),name="user-list"),
    path("api/admin/users/<int:user_id>/", views.update_user.as_view(), name="update_user")
    ] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
