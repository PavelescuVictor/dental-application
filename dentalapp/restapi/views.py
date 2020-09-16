from django.shortcuts import render, get_object_or_404
from rest_framework import viewsets, status
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from .serializers import DoctorSerializer, PacientSerializer, OrderSerializer, OrderTypeSerializer, OrderStatusSerializer
from .models import Doctor, Pacient, Order, OrderType, OrderStatus
from .permissions import ReadOnly
from django_filters.rest_framework import DjangoFilterBackend
import django_filters

# Creating filtet sets.


class DoctorFilter(django_filters.FilterSet):
    class Meta:
        model = Doctor
        fields = {
            'id': ['exact'],
            'firstName': ['exact', 'contains'],
            'lastName': ['exact', 'contains'],
            'cabinet': ['exact', 'contains'],
            'phone': ['exact', 'contains'],
        }


class PacientFilter(django_filters.FilterSet):
    class Meta:
        model = Pacient
        fields = {
            'id': ['exact'],
            'firstName': ['exact', 'contains'],
            'lastName': ['exact', 'contains'],
            'phone': ['exact', 'contains'],
        }


class OrderFilter(django_filters.FilterSet):
    class Meta:
        model = Order
        fields = {
            'id': ['exact'],
            'type': ['exact'],
            'doctor': ['exact'],
            'pacient': ['exact'],
            'status': ['exact'],
            'warranty': ['exact'],
        }


class OrderTypeFilter(django_filters.FilterSet):
    class Meta:
        model = OrderType
        fields = {
            'id': ['exact'],
            'type': ['exact'],
        }


class OrderStatusFilter(django_filters.FilterSet):
    class Meta:
        model = OrderStatus
        fields = {
            'id': ['exact'],
            'status': ['exact'],
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


class PacientViewSet(viewsets.ModelViewSet):
    """
    A simple ViewSet for viewing and editing pacients.
    """
    queryset = Pacient.objects.all()
    serializer_class = PacientSerializer
    permission_classes = [IsAuthenticated]
    filter_backends = [DjangoFilterBackend]
    filterset_class = PacientFilter
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
    filterset_fields = ['id', 'type', 'doctor',
                        'pacient', 'status', 'warranty']
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


class OrderTypeViewSet(viewsets.ModelViewSet):
    """
    A simple ViewSet for viewing and editing orders.
    """
    queryset = OrderType.objects.all()
    serializer_class = OrderTypeSerializer
    permission_classes = [IsAuthenticated, ReadOnly]
    filter_backends = [DjangoFilterBackend]
    filterset_class = OrderTypeFilter
    filterset_fields = ['id', 'type']
    # authentication_classes = [TokenAuthentication, ]


class OrderStatusViewSet(viewsets.ModelViewSet):
    """
    A simple ViewSet for viewing and editing orders.
    """
    queryset = OrderStatus.objects.all()
    serializer_class = OrderStatusSerializer
    permission_classes = [IsAuthenticated, ReadOnly]
    filter_backends = [DjangoFilterBackend]
    filterset_class = OrderStatusFilter
    filterset_fields = ['id', 'status']
    # authentication_classes = [TokenAuthentication, ]
