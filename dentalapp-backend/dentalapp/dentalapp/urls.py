"""dentalapp URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path
from django.conf.urls import include
from django.contrib.auth import views as auth_views

urlpatterns = [
    # Admin URLS
    # path('jet/', include('jet.urls', 'jet')),
    # path('jet/dashboard/', include('jet.dashboard.urls', 'jet-dashboard')),
    path('admin/', admin.site.urls),

    # Password Reset
    path(
        'admin/password_reset/',
        auth_views.PasswordResetView.as_view(),
        name='password_reset'
    ),

    # Password Reset Done
    path(
        'admin/password_reset/done/',
        auth_views.PasswordResetDoneView.as_view(),
        name='password_reset_done',
    ),

    # Password Change
    path(
        'admin/password_change/',
        auth_views.PasswordChangeView.as_view(),
        name='password_change',
    ),

    # Password Change Done
    path(
        'admin/password_change/done/',
        auth_views.PasswordChangeDoneView.as_view(),
        name='password_change_done',
    ),

    # Password Reset Confirm
    path(
        'admin/<uidb64>/<token>/',
        auth_views.PasswordResetConfirmView.as_view(),
        name='password_reset_confirm',
    ),

    # Password Reset Complete
    path(
        'admin/done/',
        auth_views.PasswordResetCompleteView.as_view(),
        name='password_reset_complete',
    ),

    # API URLS
    path('api/v1/', include('restapi.urls')),

    # USERS URLS
    path('users/', include('userauth.urls')),
]
