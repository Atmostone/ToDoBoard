from rest_framework.viewsets import ModelViewSet

from users.models import CustomUser
from users.serializers import UserModelSerializer


class UserModelViewSet(ModelViewSet):
    queryset = CustomUser.objects.all()
    serializer_class = UserModelSerializer
