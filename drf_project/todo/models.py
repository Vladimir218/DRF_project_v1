from django.db import models

from users.models import CustomUser


class Project(models.Model):
    name = models.CharField(max_length=150, unique=True)
    repository = models.URLField(blank=True)
    users = models.ManyToManyField(CustomUser)
    

    def __str__(self):
        return self.name
