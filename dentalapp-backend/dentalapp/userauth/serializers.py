from django.contrib.auth.models import User, Group
from django.contrib.auth import authenticate
from .models import User, UserProfile
from rest_framework import serializers

from django.contrib.auth import get_user_model as user_model
User = user_model()

"""
class GroupSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Group
        fields = ['url', 'name']
"""


def validateNumber(number):
    if(len(str(number)) != 10 or len(str(number)) != 6):
        raise serializers.ValidationError(
            "Cannot add Doctor. Reason: Phone number is not valid! Number format: xxxx xxx xxx).")


class UserSerializer(serializers.ModelSerializer):
    """
    @Description:
        Serializer for user
    """
    class Meta:
        model = User
        fields = [
            'id', 'email', 'password', 'is_admin', 'is_staff', 'createdAt', 'updatedAt'
        ]
        extra_kwargs = {'password': {'write_only': True, 'min_length': 8}}

    def create(self, validated_data):
        user = User.objects.create_user(**validated_data)
        user.save()
        return user


class UserProfileSerializer(serializers.ModelSerializer):
    """
    @Description:
        Serializer for user profile
    """
    class Meta:
        model = UserProfile
        fields = [
            'user', 'userEmail', 'firstName', 'lastName', 'phone', 'createdAt', 'updatedAt'
        ]

    def update(self, instance, validated_data):
        profile_data = validated_data.pop('profile')
        profile = instance.profile
        instance.email = validated_data.get('email', instance.email)
        instance.save()
        profile.firstName = profile_data.get('firstName', profile.firstName)
        profile.lastName = profile_data.get('lastName', profile.lastName)
        profile.save()


class RegisterSerializer(serializers.ModelSerializer):
    """
    @Description:
        Serializer for registering an user.
    """
    class Meta:
        model = User
        fields = [
            'id', 'email', 'password'
        ]

    def create(self, validated_data):
        user = User.objects.create_user(
            validated_data['email'], validated_data['password'])
        return user


class LoginSerializer(serializers.ModelSerializer):
    """
    @Description:
        Serializer for logging in an user.
    """
    class Meta:
        model = User
        fields = [
            'email', 'password'
        ]

    email = serializers.CharField()
    password = serializers.CharField()

    def validate(self, data):
        user = authenticate(**data)
        if user:
            if user.is_active:
                return user
            else:
                msg = "User is deactivated."
                raise serializers.ValidationError(msg)
        else:
            msg = "Incorrect Credentials!"
            raise serializers.ValidationError(msg)


class ChangePasswordSerializer(serializers.ModelSerializer):
    """
    @Description:
        Serializer for chaning the password
    """
    class Meta:
        model = User
        fields = ['oldPassword', 'newPassword', 'confirmNewPassword']

    oldPassword = serializers.CharField(required=True)
    newPassword = serializers.CharField(required=True)
    confirmNewPassword = serializers.CharField(required=True)
