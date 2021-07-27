from django.db import models

from users.models import CustomUser


class Project(models.Model):
    name = models.CharField(max_length=100)
    repository = models.CharField(max_length=1000)
    users = models.ManyToManyField(CustomUser)


class ToDo(models.Model):
    project = models.ForeignKey(Project, on_delete=models.CASCADE)
    text = models.TextField()
    created = models.DateTimeField(auto_now_add=True)
    modified = models.DateTimeField(auto_now=True)
    created_by = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    status = models.BooleanField()
