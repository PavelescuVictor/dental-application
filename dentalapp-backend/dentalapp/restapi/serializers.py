from rest_framework import serializers
from rest_framework.validators import UniqueTogetherValidator, UniqueValidator
from .models import Doctor, Patient, Order, OrderType, OrderStatus, OrderTypeEntry, OrderColor

# ModelSerializer is from django rest framework


def validateNumber(number):
    if(len(str(number)) != 10 or len(str(number)) != 6):
        raise serializers.ValidationError(
            "Cannot add Doctor. Reason: Phone number is not valid! Number format: xxxx xxx xxx).")


class DoctorSerializer(serializers.ModelSerializer):

    class Meta:
        model = Doctor
        fields = [
            'id', 'firstName', 'lastName', 'cabinet', 'phone', 'createdBy', 'updatedBy', 'createdAt', 'updatedAt'
        ]
        validators = [
            UniqueTogetherValidator(
                queryset=Doctor.objects.all(), fields=['firstName', 'lastName'], message="Cannot add doctor. Reason:  Doctor already exists!"
            )
        ]


class PatientSerializer(serializers.ModelSerializer):
    class Meta:
        model = Patient
        fields = [
            'id', 'firstName', 'lastName', 'phone', 'details', 'createdBy', 'updatedBy', 'createdAt', 'updatedAt'
        ]
        validators = [
            UniqueTogetherValidator(
                queryset=Patient.objects.all(), fields=['firstName', 'lastName'], message="Cannot add patient. Reason:  Patient already exists!"
            )
        ]


class OrderSerializer(serializers.ModelSerializer):
    doctorName = serializers.CharField(
        source='doctor.__str__', read_only=True)
    patientName = serializers.CharField(
        source='patient.__str__', read_only=True)
    createdByName = serializers.CharField(
        source='createdBy.__str__', read_only=True
    )
    updatedByName = serializers.CharField(
        source='updatedBy.__str__', read_only=True)

    class Meta:
        model = Order
        fields = [
            'id', 'doctor', 'doctorName', 'patient', 'patientName', 'createdBy', 'createdByName', 'updatedBy', 'updatedByName', 'createdAt', 'updatedAt'
        ]


class OrderTypeSerializer(serializers.ModelSerializer):
    # Validating data

    type = serializers.CharField(validators=[UniqueValidator(queryset=OrderType.objects.all(
    ), message="Cannot add order type. Reason: Order type already exists.")])

    class Meta:
        model = OrderType
        fields = [
            'id', 'type', 'ppu', 'createdBy', 'updatedBy', 'createdAt', 'updatedAt'
        ]


class OrderStatusSerializer(serializers.ModelSerializer):
    # Validating data

    status = serializers.CharField(validators=[UniqueValidator(queryset=OrderStatus.objects.all(
    ), message="Cannot add order status. Reason: Order status already exists.")])

    class Meta:
        model = OrderStatus
        fields = [
            'id', 'status', 'createdBy', 'updatedBy', 'createdAt', 'updatedAt'
        ]


class OrderColorSerializer(serializers.ModelSerializer):
    # Validating data

    color = serializers.CharField(validators=[UniqueValidator(queryset=OrderColor.objects.all(
    ), message="Cannot add order color. Reason: Order color already exists.")])

    class Meta:
        model = OrderStatus
        fields = [
            'id', 'color', 'createdBy', 'updatedBy', 'createdAt', 'updatedAt'
        ]


class OrderTypeEntrySerializer(serializers.ModelSerializer):
    # Serializer for the OrderTypeEntry

    typeName = serializers.CharField(
        source='type.__str__', read_only=True
    )
    typePPU = serializers.CharField(
        source='type.ppu', read_only=True
    )

    colorName = serializers.CharField(
        source='color.__str__', read_only=True
    )

    statusName = serializers.CharField(
        source='status.__str__', read_only=True
    )

    createdByName = serializers.CharField(
        source='createdBy.__str__', read_only=True
    )
    updatedByName = serializers.CharField(
        source='updatedBy.__str__', read_only=True)

    class Meta:
        model = OrderTypeEntry
        fields = [
            'id', 'order', 'color', 'colorName', 'type', 'typeName', 'typePPU', 'status', 'statusName', 'unitCount', 'redo', 'paid', 'warranty', 'createdBy', 'createdByName', 'updatedBy', 'updatedByName', 'createdAt', 'updatedAt'
        ]
        extra_kwargs = {
            'order': {
                'read_only': False,
                'required': True,
            },

            'color': {
                'required': True,
            },

            'type': {
                'required': True,
            },

            'status': {
                'required': True,
            },

            'createdBy': {
                'required': True,
            },

            'updatedBy': {
                'required': True,
            }
        }

        validators = [
            UniqueTogetherValidator(
                queryset=OrderTypeEntry.objects.all(), fields=['order', 'type'], message="Cannot add Type. Reason: Order type already exists."
            )
        ]
