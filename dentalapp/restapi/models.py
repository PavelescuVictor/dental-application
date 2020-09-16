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
    firstName = models.CharField(max_length=100)
    lastName = models.CharField(max_length=100)
    cabinet = models.TextField(max_length=100)
    phone = PhoneNumberField(null=False, blank=False, unique=True)
    createdBy = models.ForeignKey(User,
                                  on_delete=models.DO_NOTHING,
                                  related_name='+')
    modifiedBy = models.ForeignKey(User,
                                   on_delete=models.DO_NOTHING,
                                   related_name='+')
    createdAt = models.DateTimeField(auto_now_add=True)
    updatedAt = models.DateTimeField(auto_now=True)

    class Meta:
        ordering: ['-createdAt']
        verbose_name_plural = "Doctors"

    def fullName(self):
        return f'{self.firstName} {self.lastName}'

    def __str__(self):
        return self.fullName()


class Pacient(models.Model):
    firstName = models.CharField(max_length=80)
    lastName = models.CharField(max_length=80)
    phone = PhoneNumberField(null=False, blank=False, unique=True)
    details = models.TextField()
    createdBy = models.ForeignKey(User,
                                  on_delete=models.DO_NOTHING,
                                  related_name='+')
    modifiedBy = models.ForeignKey(User,
                                   on_delete=models.DO_NOTHING,
                                   related_name='+')
    createdAt = models.DateTimeField(auto_now_add=True)
    updatedAt = models.DateTimeField(auto_now=True)

    class Meta:
        ordering: ['-createdAt']
        verbose_name_plural = "Pacients"

    def fullName(self):
        return f'{self.firstName} {self.lastName}'

    def __str__(self):
        return self.fullName()


class OrderType(models.Model):
    type = models.TextField(null=False, blank=False, unique=True)
    createdBy = models.ForeignKey(User,
                                  on_delete=models.DO_NOTHING,
                                  related_name='+')
    modifiedBy = models.ForeignKey(User,
                                   on_delete=models.DO_NOTHING,
                                   related_name='+')
    createdAt = models.DateTimeField(auto_now_add=True)
    updatedAt = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.type

    class Meta:
        ordering = ['-createdAt']
        verbose_name_plural = "Order Types"


class OrderStatus(models.Model):
    status = models.TextField(blank=True, unique=True)
    createdBy = models.ForeignKey(User,
                                  on_delete=models.DO_NOTHING,
                                  related_name='+')
    modifiedBy = models.ForeignKey(User,
                                   on_delete=models.DO_NOTHING,
                                   related_name='+')
    createdAt = models.DateTimeField(auto_now_add=True)
    updatedAt = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.status

    class Meta:
        ordering = ['-createdAt']
        verbose_name_plural = "Order Status"


class Order(models.Model):
    type = models.ForeignKey(OrderType, on_delete=models.DO_NOTHING)
    doctor = models.ForeignKey(Doctor, on_delete=models.CASCADE)
    pacient = models.ForeignKey(Pacient, on_delete=models.CASCADE)
    warranty = models.IntegerField(
        validators=[MinValueValidator(0), MaxValueValidator(100)], default=0)
    status = models.ForeignKey(
        OrderStatus, on_delete=models.DO_NOTHING)
    createdBy = models.ForeignKey(User,
                                  on_delete=models.DO_NOTHING,
                                  related_name='+')
    modifiedBy = models.ForeignKey(User,
                                   on_delete=models.DO_NOTHING,
                                   related_name='+')
    createdAt = models.DateTimeField(auto_now_add=True)
    updatedAt = models.DateTimeField(auto_now=True)

    class Meta:
        ordering: ['-createdAt']
        verbose_name_plural = "Orders"
