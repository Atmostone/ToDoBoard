from rest_framework.serializers import HyperlinkedModelSerializer

from users.models import CustomUser


class UserModelSerializer(HyperlinkedModelSerializer):
    class Meta:
        model = CustomUser
        fields = ('url', 'username', 'first_name', 'last_name', 'email')
