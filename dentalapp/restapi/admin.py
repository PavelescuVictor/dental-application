from django.contrib import admin
from .models import Doctor, Pacient, Order, OrderType, OrderStatus

# Register your models here.


class DoctorAdmin(admin.ModelAdmin):
    list_display = ['id', 'fullName', 'firstName', 'lastName', 'cabinet',
                    'phone', 'createdBy', 'modifiedBy', 'createdAt', 'updatedAt']
    search_fields = ['firstName', 'lastName',
                     'cabinet', 'phone', 'createdBy__username']

    def fullName(self, obj):
        return obj.fullName()

    def save_model(self, request, obj, form, change):
        obj.createdBy = request.user
        obj.modifiedBy = request.user


class PacientAdmin(admin.ModelAdmin):
    list_display = ['id', 'firstName', 'lastName',
                    'phone', 'details', 'createdBy', 'modifiedBy', 'createdAt', 'updatedAt']
    search_fields = ['firstName', 'lastName', 'phone', 'createdBy__username']

    def save_model(self, request, obj, form, change):
        obj.createdBy = request.user
        obj.modifiedBy = request.user


class OrderAdmin(admin.ModelAdmin):
    list_display = ['id', 'type', 'doctor', 'pacient', 'status', 'warranty',
                    'createdBy', 'modifiedBy', 'createdAt', 'updatedAt']
    search_fields = ['type__type', 'doctor__firstName',
                     'doctor__lastName', 'pacient__firstName', 'pacient__lastName', 'status', 'createdBy__username']

    def getDoctor(self, obj):
        return obj.fullName()

    def getPacient(self, obj):
        return obj.fullName()

    def save_model(self, request, obj, form, change):
        obj.createdBy = request.user
        obj.modifiedBy = request.user


class OrderTypeAdmin(admin.ModelAdmin):
    list_display = ['id', 'type', 'createdBy',
                    'modifiedBy', 'createdAt', 'updatedAt']
    search_fields = ['type', 'createdBy__username']


class OrderStatusAdmin(admin.ModelAdmin):
    list_display = ['id', 'status', 'createdBy',
                    'modifiedBy', 'createdAt', 'updatedAt']
    search_fields = ['status', 'createdBy__username']


admin.site.register(Doctor, DoctorAdmin)
admin.site.register(Pacient, PacientAdmin)
admin.site.register(Order, OrderAdmin)
admin.site.register(OrderType, OrderTypeAdmin)
admin.site.register(OrderStatus, OrderStatusAdmin)
