from django.contrib import admin
from user_api.models import AppUser
from django.contrib.auth.admin import UserAdmin
from django.forms import TextInput, Textarea, CharField
from django import forms
from django.db import models

class UserAdminConfig(UserAdmin):
    search_fields = ('email','username',)
    list_filter = ('email','username','is_staff')
    ordering = ('-date_joined',)
    list_display = ('email','username','is_staff')

admin.site.register(AppUser, UserAdminConfig)