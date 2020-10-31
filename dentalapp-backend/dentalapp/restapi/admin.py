from django.contrib import admin
from django import forms
from django.forms.models import BaseInlineFormSet
from .models import Doctor, Patient, Order, OrderType, OrderStatus, OrderColor, OrderTypeEntry

# Register your models here.

"""
class OrderTypeEntryInline(admin.StackedInline):
    model = OrderTypeEntry
    # Using extra to display and exact amount of extra field forms for the OrderTypeEntry in the creation form of a model.
    extra = 1
"""


class OrderTypeEntryInline(admin.TabularInline):
    model = OrderTypeEntry
    # Using extra to display and exact amount of extra field forms for the OrderTypeEntry in the creation form of a model.
    extra = 1
    fields = [
        'order', 'color', 'type', 'status', 'unitCount', 'redo', 'paid', 'warranty'
    ]


class DoctorAdmin(admin.ModelAdmin):
    fields = [
        'firstName', 'lastName', 'cabinet', 'phone'
    ]

    list_display = [
        'id', 'fullName', 'firstName', 'lastName', 'cabinet', 'phone', 'createdBy', 'createdAt', 'updatedBy', 'updatedAt'
    ]

    search_fields = [
        'firstName', 'lastName', 'cabinet', 'phone', 'createdBy__email'
    ]

    def save_model(self, request, obj, form, change):
        obj.createdBy = request.user
        obj.updatedBy = request.user
        super().save_model(request, obj, form, change)


class PatientAdmin(admin.ModelAdmin):
    fields = [
        'firstName', 'lastName', 'phone', 'details'
    ]
    list_display = [
        'id', 'fullName', 'firstName', 'lastName', 'phone', 'details', 'createdBy', 'createdAt', 'updatedBy', 'updatedAt'
    ]
    search_fields = [
        'firstName', 'lastName', 'phone', 'createdBy__username'
    ]

    def save_model(self, request, obj, form, change):
        obj.createdBy = request.user
        obj.updatedBy = request.user
        super().save_model(request, obj, form, change)


class OrderAdmin(admin.ModelAdmin):
    fields = [
        'doctor', 'patient'
    ]
    list_display = [
        'id', 'doctor', 'patient', 'createdBy', 'createdAt', 'updatedBy', 'updatedAt'
    ]
    search_fields = [
        'type__type', 'doctor__firstName', 'doctor__lastName', 'patient__firstName', 'patient__lastName', 'createdBy__username'
    ]

    inlines = [OrderTypeEntryInline]

    def save_formset(self, request, form, formset, change):
        instances = formset.save(commit=False)
        pre_instance = form.save(commit=False)
        for obj in formset.deleted_objects:
            obj.delete()
        for instance in instances:
            if request.method == "POST":
                if (change == False):
                    print("da")
                    instance.createdBy = request.user
                    instance.updatedBy = request.user
                else:
                    print("nu")
                    instance.createdBy = request.user
                    instance.updatedBy = request.user
            instance.save()
        formset.save_m2m()

    def getDoctor(self, obj):
        return obj.fullName()

    def getPatient(self, obj):
        return obj.fullName()

    def save_model(self, request, obj, form, change):
        obj.createdBy = request.user
        obj.updatedBy = request.user
        super().save_model(request, obj, form, change)


class OrderTypeAdmin(admin.ModelAdmin):
    fields = [
        'type', 'ppu'
    ]
    list_display = [
        'id', 'type', 'getPricePerUnit', 'createdBy', 'createdAt', 'updatedBy', 'updatedAt'
    ]
    search_fields = [
        'type', 'ppu', 'createdBy__email'
    ]

    def getOrderId(self, obj):
        return obj.order.id

    def getPricePerUnit(self, obj):
        return obj.ppu

    getPricePerUnit.admin_order_field = 'ppu'
    getPricePerUnit.short_description = 'Price Per Unit'

    def save_model(self, request, obj, form, change):
        obj.createdBy = request.user
        obj.updatedBy = request.user
        super().save_model(request, obj, form, change)


class OrderStatusAdmin(admin.ModelAdmin):
    fields = [
        'status'
    ]
    list_display = [
        'id', 'status', 'createdBy', 'createdAt', 'updatedBy', 'updatedAt'
    ]
    search_fields = [
        'status', 'createdBy__email'
    ]

    def save_model(self, request, obj, form, change):
        obj.createdBy = request.user
        obj.updatedBy = request.user
        super().save_model(request, obj, form, change)


class OrderColorAdmin(admin.ModelAdmin):
    fields = [
        'color'
    ]
    list_display = [
        'id', 'color', 'createdBy', 'createdAt', 'updatedBy', 'updatedAt'
    ]
    search_fields = [
        'color', 'createdBy__email'
    ]

    def save_model(self, request, obj, form, change):
        obj.createdBy = request.user
        obj.updatedBy = request.user
        super().save_model(request, obj, form, change)


class OrderTypeEntryAdmin(admin.ModelAdmin):
    fields = [
        'order', 'color', 'type', 'status', 'unitCount', 'redo', 'paid', 'warranty'
    ]
    list_display = [
        'id', 'getOrderId', 'getOrderDoctor', 'getOrderPatient', 'color', 'type', 'status', 'unitCount', 'redo', 'paid', 'warranty', 'createdBy', 'createdAt', 'updatedBy', 'updatedAt'
    ]
    search_fields = [
        'order', 'type__type', 'order__doctor__firstName', 'order__doctor__lastName', 'order__patient__firstName', 'order__patient__lastName', 'status__status', 'createdBy__email'
    ]

    def getOrderId(self, obj):
        return obj.order.id

    getOrderId.admin_order_field = 'order__id'
    getOrderId.short_description = 'Order Id'

    def getOrderDoctor(self, obj):
        return obj.order.doctor

    getOrderDoctor.admin_order_field = 'order__doctor'
    getOrderDoctor.short_description = 'Doctor'

    def getOrderPatient(self, obj):
        return obj.order.patient

    getOrderPatient.admin_order_field = 'order__patient'
    getOrderPatient.short_description = 'Patient'

    def save_model(self, request, obj, form, change):
        obj.createdBy = request.user
        obj.updatedBy = request.user
        super().save_model(request, obj, form, change)


admin.site.register(Doctor, DoctorAdmin)
admin.site.register(Patient, PatientAdmin)
admin.site.register(Order, OrderAdmin)
admin.site.register(OrderType, OrderTypeAdmin)
admin.site.register(OrderStatus, OrderStatusAdmin)
admin.site.register(OrderColor, OrderColorAdmin)
admin.site.register(OrderTypeEntry, OrderTypeEntryAdmin)
