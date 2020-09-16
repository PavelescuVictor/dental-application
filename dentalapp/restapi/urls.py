from django.urls import path
from django.conf.urls import include
from rest_framework import routers
from .views import DoctorViewSet, PacientViewSet, OrderViewSet, OrderTypeViewSet, OrderStatusViewSet

router = routers.DefaultRouter()
router.register('doctors', DoctorViewSet, basename="Doctors")
router.register('pacients', PacientViewSet)
router.register('orders', OrderViewSet)
router.register('order_types', OrderTypeViewSet)
router.register('order_status', OrderStatusViewSet)

urlpatterns = [
    path('', include(router.urls)),
]
