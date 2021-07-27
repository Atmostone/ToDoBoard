from rest_framework.serializers import HyperlinkedModelSerializer

from todo.models import Project, ToDo


class ProjectSerializer(HyperlinkedModelSerializer):
    class Meta:
        model = Project
        fields = '__all__'


class ToDoSerializer(HyperlinkedModelSerializer):
    class Meta:
        model = ToDo
        fields = '__all__'
