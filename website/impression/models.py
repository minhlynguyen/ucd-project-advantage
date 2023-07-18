from django.db import models
from django.utils import timezone
from main.models import Zone


# Create your models here.
class Impression(models.Model):
    zone_time_id = models.AutoField(primary_key=True)
    taxi_zone = models.ForeignKey(Zone,on_delete=models.RESTRICT)
    datetime = models.DateTimeField(default=timezone.now)
    impression_history = models.PositiveIntegerField  # Actual history data
    impression_predict = models.PositiveIntegerField # ML model predict
    year_month = models.CharField(max_length=7)                       
    week = models.CharField(max_length=1)
    hour = models.CharField(max_length=2)
    entertainment_and_recreation = models.FloatField
    financial_services = models.FloatField
    food_and_beverage = models.FloatField
    parking_and_automotive_services = models.FloatField
    professional_services = models.FloatField
    real_estate = models.FloatField
    retail_services = models.FloatField
    transportation = models.FloatField
    hospital = models.FloatField
    hotspots = models.FloatField
    school = models.FloatField                    
    total_business = models.FloatField              
    holiday = models.CharField(max_length=50)
    
    class Meta:
        managed = True
        db_table = 'public\".\"impression'
        unique_together = (('taxi_zone','datetime'))