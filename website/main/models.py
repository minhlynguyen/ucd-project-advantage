import datetime
from zoneinfo import ZoneInfo
from django.db import models as models
from django.contrib.auth.models import User
from django.contrib.gis.db import models as geomodels
from django.contrib.gis.geos import GEOSGeometry
from django.db.models.query import QuerySet
from django.utils import timezone

# from impression.models import Impression
# Create your models here.

# Taxi zone models in maps schema
class Zone(geomodels.Model):
    id = geomodels.PositiveIntegerField(primary_key=True)
    name = geomodels.CharField(max_length=45)
    borough = geomodels.CharField(max_length=13)
    geom = geomodels.MultiPolygonField()

    class Meta:
        managed = True
        db_table = 'maps\".\"zone'

    def __str__(self):
        return f"Zone(id={self.id}, name='{self.name}', borough='{self.borough}')"

class ZoneDetail(models.Model):
    zone_time_id = models.AutoField(primary_key=True)
    taxi_zone = models.ForeignKey(Zone,related_name='zone_detail',on_delete=models.RESTRICT)
    datetime = models.DateTimeField(default=timezone.now)
    impression_history = models.PositiveIntegerField(null=True) # Actual history data
    impression_predict = models.PositiveIntegerField(null=True) # ML model predict
    place_last_update = models.DateTimeField(default=timezone.now)
    prediction_last_update = models.DateTimeField(default=timezone.now,null=True)
    month = models.CharField(max_length=2,null=True)                       
    week = models.CharField(max_length=1)
    hour = models.CharField(max_length=2)
    borough = models.CharField(max_length=13,null=True)
    entertainment_and_recreation = models.PositiveIntegerField(default=0)
    financial_services = models.PositiveIntegerField(default=0)
    food_and_beverage = models.PositiveIntegerField(default=0)
    parking_and_automotive_services = models.PositiveIntegerField(default=0)
    professional_services = models.PositiveIntegerField(default=0)
    real_estate = models.PositiveIntegerField(default=0)
    retail_services = models.PositiveIntegerField(default=0)
    transportation = models.PositiveIntegerField(default=0)
    hospital = models.PositiveIntegerField(default=0)
    hotspots = models.PositiveIntegerField(default=0)
    school = models.PositiveIntegerField(default=0)
    total_business = models.PositiveIntegerField(default=0)           
    holiday = models.CharField(max_length=50,null=True)
    
    class Meta:
        managed = True
        db_table = 'maps\".\"zone_detail'
        unique_together = (('taxi_zone','datetime'))
        index_together = [
            ("taxi_zone", "datetime"),
        ]
    
    def __str__(self):
        return (
            f"ZoneDetail(zone_time_id={self.zone_time_id}, "
            f"taxi_zone={self.taxi_zone}, "
            f"datetime={self.datetime})"
        )

# PUMA model in maps schema
class Puma(geomodels.Model):
    id = geomodels.PositiveBigIntegerField(primary_key=True)
    median_income = geomodels.IntegerField(null=True)
    females_under_5 = geomodels.FloatField(null=True)
    females_5_14 = geomodels.FloatField(null=True)
    females_15_24 = geomodels.FloatField(null=True)
    females_25_34 = geomodels.FloatField(null=True)	
    females_35_44 = geomodels.FloatField(null=True)	
    females_45_54 = geomodels.FloatField(null=True)	
    females_55_64 = geomodels.FloatField(null=True)	
    females_65_74 = geomodels.FloatField(null=True)	
    females_75_84 = geomodels.FloatField(null=True)	
    females_85 = geomodels.FloatField(null=True)	
    males_under_5 = geomodels.FloatField(null=True)	
    males_5_14 = geomodels.FloatField(null=True)
    males_15_24 = geomodels.FloatField(null=True)	
    males_25_34 = geomodels.FloatField(null=True)	
    males_35_44 = geomodels.FloatField(null=True)	
    males_45_54 = geomodels.FloatField(null=True)	
    males_55_64 = geomodels.FloatField(null=True)	
    males_65_74 = geomodels.FloatField(null=True)	
    males_75_84	= geomodels.FloatField(null=True)
    males_85 = geomodels.FloatField(null=True)	
    main_demographic = geomodels.CharField(null=True, max_length=13)
    geom = geomodels.MultiPolygonField()
    
    class Meta:
        managed = True
        db_table = 'maps\".\"puma'

    def __str__(self):
        return f"Puma(id={self.id}, median_income={self.median_income}, main_demographic='{self.main_demographic}')"

# Models to calculate intersection among Zones and Pumas

class ZonePuma(geomodels.Model):
    id = geomodels.AutoField(primary_key=True)
    zone = geomodels.ForeignKey(Zone,related_name='zone_puma',on_delete=geomodels.RESTRICT)
    puma = geomodels.ForeignKey(Puma,related_name='puma_zone',on_delete=geomodels.RESTRICT)
    intersection = geomodels.FloatField(null=True)
    median_income = geomodels.FloatField(null=True)
    females_under_5 = geomodels.FloatField(null=True)
    females_5_14 = geomodels.FloatField(null=True)
    females_15_24 = geomodels.FloatField(null=True)
    females_25_34 = geomodels.FloatField(null=True)	
    females_35_44 = geomodels.FloatField(null=True)	
    females_45_54 = geomodels.FloatField(null=True)	
    females_55_64 = geomodels.FloatField(null=True)	
    females_65_74 = geomodels.FloatField(null=True)	
    females_75_84 = geomodels.FloatField(null=True)	
    females_85 = geomodels.FloatField(null=True)	
    males_under_5 = geomodels.FloatField(null=True)	
    males_5_14 = geomodels.FloatField(null=True)
    males_15_24 = geomodels.FloatField(null=True)	
    males_25_34 = geomodels.FloatField(null=True)	
    males_35_44 = geomodels.FloatField(null=True)	
    males_45_54 = geomodels.FloatField(null=True)	
    males_55_64 = geomodels.FloatField(null=True)	
    males_65_74 = geomodels.FloatField(null=True)	
    males_75_84	= geomodels.FloatField(null=True)
    males_85 = geomodels.FloatField(null=True)

    class Meta:
        managed = True
        db_table = 'maps\".\"zone_puma'
        unique_together = (('zone','puma'))

    def __str__(self):
        return f"Zone: {self.zone.name}, Puma: Puma ID: {self.puma.id}"

# Places model in maps schema
class Place(geomodels.Model):

    class PlaceObjects(models.Manager):
        def get_queryset(self) -> QuerySet:
            return super().get_queryset().filter(status='Active')
        
    id = geomodels.AutoField(primary_key=True)
    nyc_id = geomodels.CharField(unique=True, max_length=30)
    status = geomodels.CharField(max_length=8)
    last_update = geomodels.DateTimeField(default=timezone.now)
    small_cate = geomodels.CharField(max_length=50)
    big_cate = geomodels.CharField(max_length=50)
    name = geomodels.CharField(max_length=150)
    geom = geomodels.PointField()
    taxi_zone = models.ForeignKey(Zone,related_name='zone_places',on_delete=models.RESTRICT)
    objects = models.Manager() #default manager
    placeobjects = PlaceObjects()

    class Meta:
        managed = True
        db_table = 'maps\".\"place'

    def __str__(self):
        return f"Place(id={self.id}, name='{self.name}', nyc_id='{self.nyc_id}', status='{self.status}')"

class ZoneToday(models.Model):

    zone_id = models.PositiveIntegerField(null=True)
    datetime = models.DateTimeField(null=True)
    impression_predict = models.PositiveIntegerField(null=True) # ML model predict
    entertainment_and_recreation = models.PositiveIntegerField(null=True)
    financial_services = models.PositiveIntegerField(null=True)
    food_and_beverage = models.PositiveIntegerField(null=True)
    parking_and_automotive_services = models.PositiveIntegerField(null=True)
    professional_services = models.PositiveIntegerField(null=True)
    real_estate = models.PositiveIntegerField(null=True)
    retail_services = models.PositiveIntegerField(null=True)
    transportation = models.PositiveIntegerField(null=True)
    hospital = models.PositiveIntegerField(null=True)
    hotspots = models.PositiveIntegerField(null=True)
    school = models.PositiveIntegerField(null=True)
    total_business = models.PositiveIntegerField(null=True)           
    holiday = models.CharField(max_length=50,null=True)

    class Meta:
        managed = True
        db_table = 'maps\".\"zone_today'
        unique_together = (('zone_id','datetime'))
        index_together = [
            ("zone_id", "datetime"),
        ]
