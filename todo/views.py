from rest_framework import permissions
from rest_framework.viewsets import ModelViewSet

from todo.models import Project, ToDo
from todo.serializers import ProjectSerializer, ToDoSerializer


class ProjectViewSet(ModelViewSet):
    permission_classes = [permissions.IsAuthenticated]
    queryset = Project.objects.all()
    serializer_class = ProjectSerializer


class ToDoViewSet(ModelViewSet):
    permission_classes = [permissions.IsAuthenticated]
    queryset = ToDo.objects.all()
    serializer_class = ToDoSerializer
