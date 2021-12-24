from rest_framework.serializers import HyperlinkedModelSerializer

from users.models import CustomUser


class UserModelSerializer(HyperlinkedModelSerializer):
    class Meta:
        model = CustomUser
        fields = ('url', 'username', 'first_name', 'last_name', 'email')


class UserModelSerializerV2(HyperlinkedModelSerializer):
    class Meta:
        model = CustomUser
        fields = ('url', 'username', 'first_name', 'last_name', 'email', 'is_superuser', 'is_staff')
