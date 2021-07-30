from rest_framework import mixins, viewsets

from users.models import CustomUser
from users.serializers import UserModelSerializer


class UserModelViewSet(mixins.ListModelMixin, mixins.RetrieveModelMixin, mixins.UpdateModelMixin,
                       viewsets.GenericViewSet):
    queryset = CustomUser.objects.all()
    serializer_class = UserModelSerializer
