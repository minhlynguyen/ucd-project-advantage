from django.contrib.gis import admin

# Register your models here.
from .models import TaxiZone

admin.site.register(TaxiZone, admin.ModelAdmin)