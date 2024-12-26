from django.urls import path
from api_app import views

urlpatterns = [
    path('index/',views.index, name="index"),
]