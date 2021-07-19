from django.core.management.base import BaseCommand

from users.models import CustomUser


class Command(BaseCommand):
    help = 'Creates 3 default users only for testing purposes'

    def handle(self, *args, **options):
        """
        Method for creating users for testing
        :param args:
        :param options:
        :return:
        """

        user = CustomUser.objects.create_user('user1', password='1', email='user1@email.com')
        user.save()
        user = CustomUser.objects.create_user('user2', password='2', email='user2@email.com')
        user.save()
        user = CustomUser.objects.create_user('user3', password='3', email='user3@email.com')
        user.save()

        self.stdout.write(
            self.style.SUCCESS(
                f'Created test users'))
