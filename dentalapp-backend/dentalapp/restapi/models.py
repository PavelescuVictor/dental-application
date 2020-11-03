from django.db import models
from django.contrib.auth import get_user_model as user_model
from django.core.validators import MinValueValidator, MaxValueValidator
from datetime import datetime
from phonenumber_field.modelfields import PhoneNumberField
from django.contrib.auth.models import User
from django.conf import settings
from django.db.models.signals import post_save
from django.dispatch import receiver
from rest_framework.authtoken.models import Token

"""
@receiver(post_save, sender=settings.AUTH_USER_MODEL)
def create_auth_token(sender, instance=None, created=False, **kwargs):
    if created:
        Token.objects.create(user=instance)

"""
User = user_model()


# Create your models here.


class Doctor(models.Model):
    firstName = models.CharField(max_length=100, verbose_name="First Name")
    lastName = models.CharField(max_length=100, verbose_name="Last Name")
    cabinet = models.TextField(max_length=300, verbose_name="Cabinet")
    phone = PhoneNumberField(null=False, blank=False,
                             unique=True, verbose_name="Numar Telefon")
    createdBy = models.ForeignKey(User,
                                  on_delete=models.SET_NULL, null=True,
                                  related_name='+')
    updatedBy = models.ForeignKey(User,
                                  on_delete=models.SET_NULL, null=True,
                                  related_name='+')
    createdAt = models.DateTimeField(auto_now_add=True)
    updatedAt = models.DateTimeField(auto_now=True)

    class Meta:
        ordering: ['fullName', 'firstName', 'lastName']
        verbose_name = "Doctor"
        verbose_name_plural = "Doctors"

    def fullName(self):
        return f'{self.firstName} {self.lastName}'

    def __str__(self):
        return self.fullName()


class Patient(models.Model):
    firstName = models.CharField(max_length=80)
    lastName = models.CharField(max_length=80)
    phone = PhoneNumberField(null=False, blank=False, unique=True)
    details = models.TextField(max_length=300)
    createdBy = models.ForeignKey(User,
                                  on_delete=models.SET_NULL, null=True,
                                  related_name='+')
    updatedBy = models.ForeignKey(User,
                                  on_delete=models.SET_NULL, null=True,
                                  related_name='+')
    createdAt = models.DateTimeField(auto_now_add=True)
    updatedAt = models.DateTimeField(auto_now=True)

    class Meta:
        ordering: ['firstName', 'lastName']
        verbose_name = "Patient"
        verbose_name_plural = "Patients"

    def fullName(self):
        return f'{self.firstName} {self.lastName}'

    def __str__(self):
        return self.fullName()


class Order(models.Model):
    doctor = models.ForeignKey(Doctor, on_delete=models.PROTECT)
    patient = models.ForeignKey(Patient, on_delete=models.PROTECT)
    createdBy = models.ForeignKey(User,
                                  on_delete=models.SET_NULL, null=True,
                                  related_name='+')
    updatedBy = models.ForeignKey(User,
                                  on_delete=models.SET_NULL, null=True,
                                  related_name='+')
    createdAt = models.DateTimeField(auto_now_add=True)
    updatedAt = models.DateTimeField(auto_now=True)

    class Meta:
        ordering: ['-createdAt']
        verbose_name = "Order"
        verbose_name_plural = "Orders"


class OrderType(models.Model):
    type = models.TextField(null=False, blank=False, unique=True)
    ppu = models.PositiveIntegerField(null=False, blank=False)
    createdBy = models.ForeignKey(User,
                                  on_delete=models.SET_NULL, null=True,
                                  related_name='+')
    updatedBy = models.ForeignKey(User,
                                  on_delete=models.SET_NULL, null=True,
                                  related_name='+')
    createdAt = models.DateTimeField(auto_now_add=True)
    updatedAt = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.type

    class Meta:
        ordering = ['type']
        verbose_name = "Order Type"
        verbose_name_plural = "Order Types"


class OrderStatus(models.Model):
    status = models.TextField(null=False, blank=True, unique=True)
    createdBy = models.ForeignKey(User,
                                  on_delete=models.SET_NULL, null=True,
                                  related_name='+')
    updatedBy = models.ForeignKey(User,
                                  on_delete=models.SET_NULL, null=True,
                                  related_name='+')
    createdAt = models.DateTimeField(auto_now_add=True)
    updatedAt = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.status

    class Meta:
        ordering = ['status']
        verbose_name = "Order Status"
        verbose_name_plural = "Order Status"


class OrderColor(models.Model):
    color = models.TextField(null=False, blank=True, unique=True)
    createdBy = models.ForeignKey(User,
                                  on_delete=models.SET_NULL, null=True,
                                  related_name='+')
    updatedBy = models.ForeignKey(User,
                                  on_delete=models.SET_NULL, null=True,
                                  related_name='+')
    createdAt = models.DateTimeField(auto_now_add=True)
    updatedAt = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.color

    class Meta:
        ordering = ['color']
        verbose_name = "Order Color"
        verbose_name_plural = "Order Colors"


class OrderTypeEntry(models.Model):
    order = models.ForeignKey(Order, on_delete=models.CASCADE)
    color = models.ForeignKey(OrderColor, on_delete=models.PROTECT)
    type = models.ForeignKey(OrderType, on_delete=models.PROTECT)
    status = models.ForeignKey(
        OrderStatus, on_delete=models.PROTECT)
    unitCount = models.PositiveIntegerField(
        default=1, validators=[MinValueValidator(1)], blank=False)
    redo = models.BooleanField(default=False)
    paid = models.BooleanField(default=False)
    warranty = models.PositiveIntegerField(
        default=0, validators=[MinValueValidator(0)], blank=False)
    createdBy = models.ForeignKey(User,
                                  on_delete=models.SET_NULL, null=True,
                                  related_name='+')
    updatedBy = models.ForeignKey(User,
                                  on_delete=models.SET_NULL, null=True,
                                  related_name='+')
    createdAt = models.DateTimeField(auto_now_add=True)
    updatedAt = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['order', 'type', 'color']
        verbose_name = "Order Type Entry"
        verbose_name_plural = "Order Type Entries"
