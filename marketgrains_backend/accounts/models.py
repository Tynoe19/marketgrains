from django.db import models
from django.contrib.auth.models import AbstractUser

class User(AbstractUser):
    # Add any additional fields you need for your user model
    ROLE_CHOICES = (
        ('buyer', 'Buyer'),
        ('distributor', 'Distributor'),
        ('admin', 'Admin'),
    )
    role = models.CharField(max_length=50, choices=ROLE_CHOICES, default='distributor')

