from django.db import models
from django.utils import timezone
from main.models import Zone


# Create your models here.
class Impression(models.Model):
    zone_time_id = models.AutoField(primary_key=True)
    taxi_zone = models.ForeignKey(Zone,related_name='impression_in_zone',on_delete=models.RESTRICT)
    datetime = models.DateTimeField(default=timezone.now)
    impression_history = models.PositiveIntegerField(default=0) # Actual history data
    impression_predict = models.PositiveIntegerField(default=0) # ML model predict
    year_month = models.CharField(max_length=7)                       
    week = models.CharField(max_length=1)
    hour = models.CharField(max_length=2)
    entertainment_and_recreation = models.FloatField(default=0)
    financial_services = models.FloatField(default=0)
    food_and_beverage = models.FloatField(default=0)
    parking_and_automotive_services = models.FloatField(default=0)
    professional_services = models.FloatField(default=0)
    real_estate = models.FloatField(default=0)
    retail_services = models.FloatField(default=0)
    transportation = models.FloatField(default=0)
    hospital = models.FloatField(default=0)
    hotspots = models.FloatField(default=0)
    school = models.FloatField(default=0)
    total_business = models.FloatField(default=0)           
    holiday = models.CharField(max_length=50)
    
    class Meta:
        managed = True
        db_table = 'public\".\"impression'
        unique_together = (('taxi_zone','datetime'))