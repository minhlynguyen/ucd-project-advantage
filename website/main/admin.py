from django.contrib.gis import admin

# Register your models here.
from .models import Zone, Puma

class ZoneAdmin(admin.GISModelAdmin):
    list_display = ('id','name','borough')

class PumaAdmin(admin.GISModelAdmin):
    display = ('id')

admin.site.register(Zone, ZoneAdmin)
admin.site.register(Puma, PumaAdmin)