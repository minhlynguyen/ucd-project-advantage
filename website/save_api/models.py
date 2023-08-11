from django.db import models
from user_api.models import AppUser
from main.models import Zone
from django.utils import timezone

class SavedZone(models.Model):
    
    user = models.ForeignKey(AppUser, on_delete=models.CASCADE, related_name="saved_by")
    zone = models.ForeignKey(Zone, on_delete=models.CASCADE, related_name="saved_zone")
    added = models.DateTimeField(default=timezone.now)

    class Meta:
        db_table = 'user_data\".\"saved_zone'
        ordering = ('-added',)
        unique_together = (('user','zone'))
