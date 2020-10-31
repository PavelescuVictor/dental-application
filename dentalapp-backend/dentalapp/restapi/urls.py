from django.urls import path
from django.conf.urls import include
from rest_framework import routers
from .views import DoctorViewSet, PatientViewSet, OrderViewSet, OrderTypeViewSet, OrderStatusViewSet, OrderColorViewSet, OrderTypeEntryViewSet

router = routers.DefaultRouter()
router.register('doctors', DoctorViewSet, basename="Doctors")
router.register('patients', PatientViewSet)
router.register('orders', OrderViewSet)
router.register('order_types', OrderTypeViewSet)
router.register('order_status', OrderStatusViewSet)
router.register('order_colors', OrderColorViewSet)
router.register('order_type_entries', OrderTypeEntryViewSet)

urlpatterns = [
    path('', include(router.urls)),
]
