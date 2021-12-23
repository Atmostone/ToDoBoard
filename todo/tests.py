import json

from mixer.backend.django import mixer
from rest_framework import status
from rest_framework.test import APITestCase

from todo.models import ToDo
from users.models import CustomUser


class TestToDoList(APITestCase):
    def test_get_todo_list_autorized(self):
        self.user = CustomUser.objects.create_superuser('admin', 'admin@test.com', '12345')
        self.client.login(username='admin', password='12345')
        response = self.client.get('/api/todos/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_get_todo_list_unautorized(self):
        response = self.client.get('/api/todos/')
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)


class TestToDoInstance(APITestCase):
    def test_get_todo_instance_autorized(self):
        self.user = CustomUser.objects.create_superuser('admin', 'admin@test.com', '12345')
        self.client.login(username='admin', password='12345')
        todo = mixer.blend(ToDo)

        response = self.client.get(f'/api/todos/{todo.id}/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        response_todo = json.loads(response.content)
        self.assertEqual(response_todo['text'], todo.text)

    def test_get_todo_instance_unautorized(self):
        todo = mixer.blend(ToDo)
        response = self.client.get(f'/api/todos/{todo.id}/')
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)


class TestProjectList(APITestCase):
    def test_get_project_list_autorized(self):
        self.user = CustomUser.objects.create_superuser('admin', 'admin@test.com', '12345')
        self.client.login(username='admin', password='12345')
        response = self.client.get('/api/projects/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_get_project_list_unautorized(self):
        response = self.client.get('/api/projects/')
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)


class TestProjectInstance(APITestCase):
    def test_get_project_instance_autorized(self):
        self.user = CustomUser.objects.create_superuser('admin', 'admin@test.com', '12345')
        self.client.login(username='admin', password='12345')
        project = mixer.blend(ToDo)

        response = self.client.get(f'/api/todos/{project.id}/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        response_todo = json.loads(response.content)
        self.assertEqual(response_todo['text'], project.text)

    def test_get_todo_instance_unautorized(self):
        project = mixer.blend(ToDo)
        response = self.client.get(f'/api/todos/{project.id}/')
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

class TestUserList(APITestCase):
    def test_get_user_list_autorized(self):
        self.user = CustomUser.objects.create_superuser('admin', 'admin@test.com', '12345')
        self.client.login(username='admin', password='12345')
        response = self.client.get('/api/users/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_get_user_list_unautorized(self):
        response = self.client.get('/api/projects/')
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

