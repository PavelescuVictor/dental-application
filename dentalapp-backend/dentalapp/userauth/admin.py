from django.contrib import admin
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin
from .models import UserProfile, User


class UserAdmin(BaseUserAdmin):
    list_display = ['id', 'email', 'is_staff',
                    'is_admin', 'createdAt', 'updatedAt']
    search_fields = ['email', 'is_staff', 'is_admin']
    list_filter = ['is_staff', 'is_admin']
    fieldsets = (
        (None, {'fields': ('email', 'password')}),
        ('Permissions', {'fields': ('is_admin', 'is_staff')}),
    )

    add_fieldsets = (
        (None, {
            'classes': ('wide',),
            'fields': ('email', 'password1', 'password2'),
        }),
    )

    search_fields = ('email',)
    ordering = ('email',)
    filter_horizontal = ()


class UserProfileAdmin(admin.ModelAdmin):
    list_display = [
        'userEmail',
        'fullName',
        'firstName',
        'lastName',
        'phone',
        'createdAt',
        'updatedAt'
    ]

    search_fields = [
        'firstName',
        'lastName',
        'phone'
    ]

    def fullName(self, obj):
        return obj.fullName()

    def userEmail(self, obj):
        return obj.userEmail()


# Register your models here.
admin.site.register(User, UserAdmin)
admin.site.register(UserProfile, UserProfileAdmin)
