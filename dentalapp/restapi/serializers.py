from rest_framework import serializers
from rest_framework.validators import UniqueTogetherValidator, UniqueValidator
from .models import Doctor, Pacient, Order, OrderType, OrderStatus

# ModelSerializer is from django rest framework


def validateNumber(number):
    if(len(str(number)) != 10 or len(str(number)) != 6):
        raise serializers.ValidationError(
            "Cannot add Doctor. Reason: Phone number is not valid! Number format: xxxx xxx xxx).")


class DoctorSerializer(serializers.ModelSerializer):

    class Meta:
        model = Doctor
        fields = [
            'id', 'firstName', 'lastName', 'cabinet', 'phone', 'createdBy', 'modifiedBy', 'createdAt', 'updatedAt'
        ]
        validators = [
            UniqueTogetherValidator(
                queryset=Doctor.objects.all(), fields=['firstName', 'lastName'], message="Cannot add doctor. Reason:  Doctor already exists!"
            )
        ]


class PacientSerializer(serializers.ModelSerializer):
    class Meta:
        model = Pacient
        fields = [
            'id', 'firstName', 'lastName', 'phone', 'details', 'createdBy', 'modifiedBy', 'createdAt', 'updatedAt'
        ]
        validators = [
            UniqueTogetherValidator(
                queryset=Pacient.objects.all(), fields=['firstName', 'lastName'], message="Cannot add pacient. Reason:  Pacient already exists!"
            )
        ]


class OrderSerializer(serializers.ModelSerializer):
    class Meta:
        model = Order
        fields = [
            'id', 'type', 'doctor', 'pacient', 'status', 'warranty', 'createdBy', 'modifiedBy', 'createdAt', 'updatedAt'
        ]
        validators = [
            UniqueTogetherValidator(
                queryset=Order.objects.all(), fields=['type', 'doctor', 'pacient'], message="Cannot add order. Reason:  Order with same doctor, pacient and type already exists!"
            )
        ]


class OrderTypeSerializer(serializers.ModelSerializer):
    # Validating data

    type = serializers.CharField(validators=[UniqueValidator(queryset=OrderType.objects.all(
    ), message="Cannot add order type. Reason: Order type already exists.")])

    class Meta:
        model = OrderType
        fields = [
            'id', 'type', 'createdBy', 'modifiedBy', 'createdAt', 'updatedAt'
        ]


class OrderStatusSerializer(serializers.ModelSerializer):
    # Validating data

    status = serializers.CharField(validators=[UniqueValidator(queryset=OrderStatus.objects.all(
    ), message="Cannot add order status. Reason: Order status already exists.")])

    class Meta:
        model = OrderStatus
        fields = [
            'id', 'status', 'createdBy', 'modifiedBy', 'createdAt', 'updatedAt'
        ]
