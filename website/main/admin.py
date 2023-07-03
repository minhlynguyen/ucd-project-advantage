from django.contrib.gis import admin

# Register your models here.
from .models import Zone, Puma

admin.site.register(Zone, admin.GISModelAdmin)
admin.site.register(Puma, admin.GISModelAdmin)