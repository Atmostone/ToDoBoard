from django.contrib import admin
from django.urls import path, include
from rest_framework.routers import DefaultRouter

from todo.views import ToDoViewSet, ProjectViewSet
from users.views import UserModelViewSet
from rest_framework.authtoken import views

router = DefaultRouter()
router.register('users', UserModelViewSet)
router.register('todos', ToDoViewSet)
router.register('projects', ProjectViewSet)

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api-auth/', include('rest_framework.urls')),
    path('api/', include(router.urls)),
    #path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    #path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('api-token-auth/', views.obtain_auth_token),

]
