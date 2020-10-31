from django.shortcuts import render, get_object_or_404
from rest_framework import viewsets, status
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from .serializers import DoctorSerializer, PatientSerializer, OrderSerializer, OrderTypeSerializer, OrderStatusSerializer, OrderColorSerializer, OrderTypeEntrySerializer
from .models import Doctor, Patient, Order, OrderType, OrderStatus, OrderColor, OrderTypeEntry
from .permissions import ReadOnly
from django_filters.rest_framework import DjangoFilterBackend
import django_filters

# Creating filtet sets.


class DoctorFilter(django_filters.FilterSet):
    """
    A simple Filter class for the Doctor model.
    """

    class Meta:
        model = Doctor
        fields = {
            'id': ['exact'],
            'firstName': ['exact', 'icontains'],
            'lastName': ['exact', 'icontains'],
            'cabinet': ['exact', 'icontains'],
            'phone': ['exact'],
        }


class PatientFilter(django_filters.FilterSet):
    """
    A simple Filter class for the Patient model.
    """

    class Meta:
        model = Patient
        fields = {
            'id': ['exact'],
            'firstName': ['exact', 'icontains'],
            'lastName': ['exact', 'icontains'],
            'phone': ['exact'],
        }


class OrderFilter(django_filters.FilterSet):
    """
    A simple Filter class for the Order model.
    """

    class Meta:
        model = Order
        fields = {
            'id': ['exact'],
            'doctor': ['exact'],
            'patient': ['exact'],
        }


class OrderTypeFilter(django_filters.FilterSet):
    """
    A simple Filter class for the OrderType model.
    """

    class Meta:
        model = OrderType
        fields = {
            'id': ['exact'],
            'type': ['exact', 'icontains'],
            'ppu': ['exact'],
        }


class OrderStatusFilter(django_filters.FilterSet):
    """
    A simple Filter class for the OrderStatus model.
    """

    class Meta:
        model = OrderStatus
        fields = {
            'id': ['exact'],
            'status': ['exact', 'icontains'],
        }


class OrderColorFilter(django_filters.FilterSet):
    """
    A simple Filter class for the OrderColor model.
    """

    class Meta:
        model = OrderColor
        fields = {
            'id': ['exact'],
            'color': ['exact', 'icontains'],
        }


class OrderTypeEntryFilter(django_filters.FilterSet):
    """
    A simple Filter class for the OrderTypeEntry model.
    """

    class Meta:
        model = OrderTypeEntry
        fields = {
            'id': ['exact'],
            'order': ['exact'],
            'color': ['exact'],
            'type': ['exact'],
            'status': ['exact'],
            'redo': ['exact'],
            'paid': ['exact'],
            'warranty': ['exact'],
        }

# Createing view sets.


class DoctorViewSet(viewsets.ModelViewSet):
    """
    A simple ViewSet for viewing and editing doctors.
    """

    queryset = Doctor.objects.all()
    serializer_class = DoctorSerializer
    permission_classes = [IsAuthenticated]
    filter_backends = [DjangoFilterBackend]
    filterset_class = DoctorFilter
    filterset_fields = ['id', 'firstName', 'lastName', 'cabinet', 'phone']
    # authentication_classes = [TokenAuthentication, ]


class PatientViewSet(viewsets.ModelViewSet):
    """
    A simple ViewSet for viewing and editing patients.
    """

    queryset = Patient.objects.all()
    serializer_class = PatientSerializer
    permission_classes = [IsAuthenticated]
    filter_backends = [DjangoFilterBackend]
    filterset_class = PatientFilter
    filterset_fields = ['id', 'firstName', 'lastName', 'phone']
    # authentication_classes = [TokenAuthentication, ]


class OrderViewSet(viewsets.ModelViewSet):
    """
    A simple ViewSet for viewing and editing orders.
    """
    queryset = Order.objects.all()
    serializer_class = OrderSerializer
    permission_classes = [IsAuthenticated]
    filter_backends = [DjangoFilterBackend]
    filterset_class = OrderFilter
    filterset_fields = ['id', 'doctor', 'patient']
    # authentication_classes = [TokenAuthentication, ]
    """
    def list(self, request):
        print("list")
        queryset = Order.objects.all()
        serializer = OrderSerializer(queryset, many=True)
        return Response(serializer.data)

    def retrieve(self, request, pk=None):
        print("list1")
        queryset = Order.objects.all()
        order = get_object_or_404(queryset, pk=pk)
        serializer = OrderSerializer(order)
        return Response(serializer.data)
    """


class OrderTypeViewSet(viewsets.ModelViewSet):
    """
    A simple ViewSet for viewing and editing orders.
    """
    queryset = OrderType.objects.all()
    serializer_class = OrderTypeSerializer
    permission_classes = [IsAuthenticated, ReadOnly]
    filter_backends = [DjangoFilterBackend]
    filterset_class = OrderTypeFilter
    filterset_fields = ['id', 'type', 'ppu']
    # authentication_classes = [TokenAuthentication, ]


class OrderStatusViewSet(viewsets.ModelViewSet):
    """
    A simple ViewSet for viewing orders.
    """
    queryset = OrderStatus.objects.all()
    serializer_class = OrderStatusSerializer
    permission_classes = [IsAuthenticated, ReadOnly]
    filter_backends = [DjangoFilterBackend]
    filterset_class = OrderStatusFilter
    filterset_fields = ['id', 'status']
    # authentication_classes = [TokenAuthentication, ]


class OrderColorViewSet(viewsets.ModelViewSet):
    """
    A simple ViewSet for viewing colors,
    """
    queryset = OrderColor.objects.all()
    serializer_class = OrderColorSerializer
    permission_classes = [IsAuthenticated, ReadOnly]
    filter_backends = [DjangoFilterBackend]
    filterset_class = OrderColorFilter
    filterset_fields = [
        'id', 'color'
    ]
    # authentication_classes = [TokenAuthentication, ]


class OrderTypeEntryViewSet(viewsets.ModelViewSet):
    """
    A simple ViewSet for viewing and editing orders.
    """
    queryset = OrderTypeEntry.objects.all()
    serializer_class = OrderTypeEntrySerializer
    permission_classes = [IsAuthenticated]
    filter_backends = [DjangoFilterBackend]
    filterset_class = OrderTypeEntryFilter
    filterset_fields = [
        'id', 'order', 'color', 'type', 'status', 'redo', 'paid', 'warranty'
    ]

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(
            data=request.data, many=isinstance(request.data, list))
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)

    # authentication_classes = [TokenAuthentication, ]
    """
    def list(self, request):
        print("list")
        queryset = Order.objects.all()
        serializer = OrderSerializer(queryset, many=True)
        return Response(serializer.data)

    def retrieve(self, request, pk=None):
        print("list1")
        queryset = Order.objects.all()
        order = get_object_or_404(queryset, pk=pk)
        serializer = OrderSerializer(order)
        return Response(serializer.data)
    """
    """
    def create(self, request):
        print("create")

    def update(self, request, pk=None):
        print("update")

    def partial_update(self, request, pk=None):
        print("list")

    def destroy(self, request, pk=None):
        print("destroy")
    """
