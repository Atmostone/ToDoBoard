from rest_framework.viewsets import ModelViewSet

from todo.models import Project, ToDo
from todo.serializers import ProjectSerializer, ToDoSerializer


class ProjectViewSet(ModelViewSet):
    queryset = Project.objects.all()
    serializer_class = ProjectSerializer


class ToDoViewSet(ModelViewSet):
    queryset = ToDo.objects.all()
    serializer_class = ToDoSerializer
