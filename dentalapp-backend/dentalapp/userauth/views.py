from django.core.exceptions import PermissionDenied
from django.shortcuts import render, get_object_or_404
from django.contrib.auth.models import Group
from rest_framework import viewsets, permissions
from rest_framework.views import APIView
from rest_framework.authtoken.views import ObtainAuthToken
from rest_framework.authtoken.models import Token
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, AllowAny
from .serializers import UserSerializer, UserProfileSerializer
from .models import User, UserProfile
# Create your views here.


"""
class GroupViewSet(viewsets.ModelViewSet):
    API endpoint that allows groups to be viewed or edited.
    queryset = Group.objects.all()
    serializer_class = GroupSerializer
    permission_classes = [permissions.IsAuthenticated]
"""


class UserViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows users to be viewed or edited.
    """
    queryset = User.objects.all().order_by('-createdAt')
    serializer_class = UserSerializer
    permission_classes = [IsAuthenticated]
    """
    def get_queryset(self):
        if self.request.user.is_staff:
            return User.objects.all()
        else:
            return self.request.user
    """


class UserProfileView(APIView):
    """
    API endpoint that allows user profile to be viewed or edited.
    """
    permission_classes = [IsAuthenticated]

    def get(self, request, pk):
        try:
            user = get_object_or_404(User, pk=pk)
        except:
            msg = "User not found!"
            return Response(msg)
        try:
            profile = get_object_or_404(UserProfile, user=user)
        except:
            msg = "Profile not found!"
            return Response(msg)
        serializer = UserProfileSerializer(profile)
        return Response(serializer.data)
