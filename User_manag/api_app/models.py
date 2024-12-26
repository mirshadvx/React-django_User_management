# from django.db import models
# from django.contrib.auth.models import User

# class Profile(models.Model):
#     user = models.OneToOneField(User,on_delete=models.CASCADE, related_name='profile')
#     phone_number = models.CharField(max_length=10, blank=True, null=True)
#     address = models.TextField(blank=True, null=True)
#     gender_choices = [
#         ('M', 'Male'),
#         ('F', 'Female'),
#     ]
#     gender = models.CharField(max_length=1, choices=gender_choices, blank=True, null=True)
#     profile_picture = models.ImageField(upload_to='profile_pictures/', blank=True, null=True)

#     def __str__(self):
#         return self.user.username


from django.db import models
from django.contrib.auth.models import User

class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    phone_number = models.CharField(max_length=15, blank=True, null=True)
    address = models.CharField(max_length=255, blank=True, null=True)
    gender = models.CharField(max_length=10, blank=True, null=True)
    profile_picture = models.ImageField(upload_to='profile_pictures/', blank=True, null=True)

    def __str__(self):
        return self.user.username