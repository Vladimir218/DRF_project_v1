from django.db import models

# Create your models here.

import uuid
from uuid import uuid4

from django.contrib.auth.models import AbstractUser


class CustomUser(AbstractUser):

    uuid = models.UUIDField(primary_key=True, default=uuid4)
    email = models.EmailField(blank=True, unique=True)

    def __str__(self):
        return self.email