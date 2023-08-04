from django.contrib import admin
from user_api.models import AppUser
from django.contrib.auth.admin import UserAdmin
from django.forms import TextInput, Textarea, CharField
from django import forms
from django.db import models

class UserAdminConfig(UserAdmin):
    model = AppUser
    search_fields = ('email','username',)
    list_filter = ('email','username','is_staff')
    ordering = ('-date_joined',)
    list_display = ('email','username','is_staff')

    fieldsets = (
        (None, {'fields': ('email', 'username',)}),
        ('Permissions', {'fields': ('is_staff',)}),
        ('Personal', {'fields': ('date_joined',)}),
    )
    formfield_overrides = {
        models.TextField: {'widget': Textarea(attrs={'rows': 20, 'cols': 60})},
    }
    add_fieldsets = (
        (None, {
            'classes': ('wide',),
            'fields': ('email', 'user_name', 'first_name', 'password1', 'password2', 'is_active', 'is_staff')}
         ),
    )

admin.site.register(AppUser, UserAdminConfig)