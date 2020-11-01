from django.contrib.auth.signals import user_logged_in, user_logged_out
from rest_framework import generics, permissions, status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, AllowAny
from knox.models import AuthToken
from knox.auth import TokenAuthentication
from knox.views import LoginView, LogoutView, LogoutAllView
from .serializers import UserSerializer, UserProfileSerializer, RegisterSerializer, LoginSerializer, ChangePasswordSerializer
from .models import User, UserProfile


class RegisterApi(generics.GenericAPIView):
    """
    @Description: 
        An Endpoint for registering.
    """
    serializer_class = RegisterSerializer
    permission_classes = [AllowAny]

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()
        return Response({
            "user": UserSerializer(user, context=self.get_serializer_context()).data,
            "token": AuthToken.objects.create(user)[1],
        })


class LoginApi(generics.GenericAPIView, LoginView):
    """
    @Description: 
        An Endpoint for logging in.
    """
    serializer_class = LoginSerializer
    permission_classes = [AllowAny]

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data
        tokenInstance, token = AuthToken.objects.create(user)
        return Response({
            "user": UserSerializer(user, context=self.get_serializer_context()).data,
            "token": token,
            "tokenExpiry": tokenInstance.expiry,
        })


class LogoutApi(APIView):
    """
    @Description: 
        An Endpoint for logging out.
    """
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]

    def post(self, request, format=None):
        request._auth.delete()
        user_logged_out.send(sender=request.user.__class__,
                             request=request, user=request.user)
        return Response(None, status=status.HTTP_204_NO_CONTENT)


class LogoutAllApi(APIView):
    '''
    @Description: 
        An Endpoint for loggin out from all sessions
        Log the user out of all sessions
        I.E. deletes all auth tokens for the user
    '''
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]

    def post(self, request, format=None):
        request.user.auth_token_set.all().delete()
        user_logged_out.send(sender=request.user.__class__,
                             request=request, user=request.user)
        return Response(None, status=status.HTTP_204_NO_CONTENT)


class RenewTokenApi(generics.GenericAPIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]

    def post(self, request, *args, **kwargs):
        user = User.objects.get(id=request.data['id'])
        tokenInstance, token = AuthToken.objects.create(user)
        return Response({
            "user": UserSerializer(user, context=self.get_serializer_context()).data,
            "token": token,
            "tokenExpiry": tokenInstance.expiry,
        })


class ChangePasswordApi(generics.UpdateAPIView):
    """
    @Description: 
        An Endpoint for changing password.
    """
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]
    serializer_class = ChangePasswordSerializer
    model = User

    def get_object(self, queryset=None):
        obj = self.request.user
        return obj

    def update(self, request, *args, **kwargs):
        self.object = self.get_object()
        serializer = self.get_serializer(data=request.data)

        if serializer.is_valid():
            # Check old password
            if not self.object.check_password(serializer.data.get("oldPassword")):
                return Response({"oldPassword": ["Wrong Password."]}, status=status.HTTP_400_BAD_REQUEST)

            if serializer.data.get("newPassword") != serializer.data.get("confirmNewPassword"):
                return Response({"message": ["New password and confirm new password are not the same."]}, status=status.HTTP_400_BAD_REQUEST)

            # Setting the new password. set_password() also hashes the password
            self.object.set_password(serializer.data.get("newPassword"))
            self.object.save()
            response = {
                'status': 'success',
                'code': status.HTTP_200_OK,
                'message': 'Password updated succesfully',
                'data': []
            }
            return Response(response)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class UserListApi(APIView):
    serializer_class = UserSerializer
    permission_classes = [IsAuthenticated]

    def get(self, request, format=None):
        users = User.objects.all()
        serializer = UserSerializer(users, many=True)
        return Response(serializer.data)


class UserProfileListApi(APIView):
    serializer_class = UserProfileSerializer
    permission_classes = [IsAuthenticated]

    def get(self, request, format=None):
        userprofiles = UserProfile.objects.all()
        serializer = UserProfileSerializer(userprofiles, many=True)
        return Response(serializer.data)
