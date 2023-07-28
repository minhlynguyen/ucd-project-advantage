from django.contrib.gis import admin
from user_api.models import AppUser
from django.contrib.auth.admin import UserAdmin

# Register your models here.
from .models import Zone, Puma

class ZoneAdmin(admin.GISModelAdmin):
    list_display = ('id','name','borough')

class PumaAdmin(admin.GISModelAdmin):
    display = ('id')

class UserAdminConfig(UserAdmin):
    search_fields = ('email','username',)
    list_filter = ('email','username','is_staff')
    ordering = ('-date_joined',)
    list_display = ('email','username','is_staff')

admin.site.register(Zone, ZoneAdmin)
admin.site.register(Puma, PumaAdmin)
admin.site.register(AppUser, UserAdminConfig)
