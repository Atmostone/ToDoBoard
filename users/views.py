from rest_framework import mixins, viewsets

from users.models import CustomUser
from users.serializers import UserModelSerializer, UserModelSerializerV2


class UserModelViewSet(mixins.ListModelMixin, mixins.RetrieveModelMixin, mixins.UpdateModelMixin,
                       viewsets.GenericViewSet):
    queryset = CustomUser.objects.all()

    def get_serializer_class(self):
        if self.request.version == '2':
            return UserModelSerializerV2
        return UserModelSerializer
