from django.contrib.gis import admin
from save_api.models import SavedZone
from django.contrib.auth.admin import UserAdmin

class SavedZoneAdmin(admin.GISModelAdmin):
    list_display = ('user','zone','added')

admin.site.register(SavedZone, SavedZoneAdmin)
