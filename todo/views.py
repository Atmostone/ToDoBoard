from rest_framework.response import Response
from rest_framework.viewsets import ModelViewSet

from todo.filters import ProjectFilter, ToDoFilter
from todo.models import Project, ToDo
from todo.paginations import ToDoPagination, ProjectPagination
from todo.serializers import ProjectSerializer, ToDoSerializer


class ProjectViewSet(ModelViewSet):
    queryset = Project.objects.all()
    serializer_class = ProjectSerializer
    pagination_class = ProjectPagination
    filterset_class = ProjectFilter


class ToDoViewSet(ModelViewSet):
    queryset = ToDo.objects.all()
    serializer_class = ToDoSerializer
    pagination_class = ToDoPagination
    filterset_class = ToDoFilter

    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        instance.status = False
        instance.save()
        serializer = self.get_serializer(instance, data=request.data)
        serializer.is_valid()
        return Response(serializer.data)
