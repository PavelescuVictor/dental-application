from rest_framework import routers
from django.urls import include, path
from .views import UserProfileView, UserViewSet
from .api import RegisterApi, LoginApi, LogoutApi, RenewTokenApi, LogoutAllApi, UserListApi, UserProfileListApi, ChangePasswordApi


router = routers.DefaultRouter()
router.register(r'', UserViewSet)

# Wire up our API using automatic URL routing.
# Additionally, we include login URLs for the browsable API.
urlpatterns = [
    path('', include(router.urls)),
    path('<int:pk>/profile/',
         UserProfileView.as_view(), name='user-profile'),
    path('auth/register', RegisterApi.as_view()),
    path('auth/login', LoginApi.as_view()),
    path('auth/renewtoken', RenewTokenApi.as_view()),
    path('auth/logout', LogoutApi.as_view()),
    path('auth/logoutall', LogoutAllApi.as_view()),
    path('auth/password-change/', ChangePasswordApi.as_view()),
    path('auth/password-reset/',
         include('django_rest_passwordreset.urls', namespace='password_reset')),
    path('userslist', UserListApi.as_view()),
    path('userprofileslist', UserProfileListApi.as_view()),
    path('auth', include('knox.urls')),
]
