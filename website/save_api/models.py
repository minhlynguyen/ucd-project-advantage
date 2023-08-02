from django.db import models
from user_api.models import AppUser
from main.models import Zone
from django.utils import timezone


# Create your models here.
class SavedZone(models.Model):
    
    user = models.ForeignKey(AppUser, on_delete=models.CASCADE, related_name="saved_by")
    zone = models.ForeignKey(AppUser, on_delete=models.CASCADE, related_name="saved_zone")
    added = models.DateTimeField(default=timezone.now)

    class Meta:
        db_table = 'user_data\".\"saved_zone'
        ordering = ('-added',)
		
    # def __str__(self):
    #     return self.title
