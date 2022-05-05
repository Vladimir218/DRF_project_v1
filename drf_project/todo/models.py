from django.db import models

from users.models import CustomUser


class Project(models.Model):
    name = models.CharField(max_length=150, unique=True)
    repository = models.URLField(blank=True)
    users = models.ManyToManyField(CustomUser)
    

    def __str__(self):
        return self.name

class ToDo(models.Model):
    project = models.ForeignKey(Project, on_delete=models.CASCADE)
    text = models.TextField()
    create = models.DateTimeField(auto_now_add=True)
    update = models.DateTimeField(auto_now=True)
    creator_user = models.ForeignKey(CustomUser, on_delete=models.PROTECT)
    flag_is_active = models.BooleanField(default=True)

