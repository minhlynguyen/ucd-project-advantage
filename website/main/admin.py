from django.contrib.gis import admin

# Register your models here.
from .models import TaxiZone, Zone
# from .models import Zone

admin.site.register(TaxiZone, admin.ModelAdmin)
# admin.site.register(Zone, admin.ModelAdmin)