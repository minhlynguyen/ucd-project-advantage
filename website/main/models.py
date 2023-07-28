import datetime
from zoneinfo import ZoneInfo
from django.db import models as models
from django.contrib.auth.models import User
from django.contrib.gis.db import models as geomodels
from django.contrib.gis.geos import GEOSGeometry
from django.utils import timezone

# from impression.models import Impression
# Create your models here.

# Taxi zone models in maps schema
class Zone(models.Model):
    id = geomodels.PositiveIntegerField(primary_key=True)
    name = geomodels.CharField(max_length=45)
    borough = geomodels.CharField(max_length=13)
    geom = geomodels.MultiPolygonField()

    def current_detail(self):

        # Use this when data is updated
        now=datetime.datetime.now(tz=ZoneInfo("America/New_York"))
        year, month, day= now.strftime("%Y"), now.strftime("%m"), now.strftime("%d")

        # This is for testing
        year, month, day = 2023, 4, 30
        return ZoneDetail.objects.filter(taxi_zone=self, 
                                        #  datetime__exact=datetime.strptime("2023-04-30T23:00:00-0400", "%Y-%m-%dT%H:%M:%S%z")
                                        datetime__date=datetime.date(year, month, day)
                                         )#,

    def multipolygon(self):
        return str(self.geom)

    class Meta:
        managed = True
        db_table = 'maps\".\"zone'

class ZoneDetail(models.Model):
    zone_time_id = models.AutoField(primary_key=True)
    taxi_zone = models.ForeignKey(Zone,related_name='zone_detail',on_delete=models.RESTRICT)
    datetime = models.DateTimeField(default=timezone.now)
    impression_history = models.PositiveIntegerField(null=True) # Actual history data
    impression_predict = models.PositiveIntegerField(null=True) # ML model predict
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
    holiday = models.CharField(max_length=50)
    
    class Meta:
        managed = True
        db_table = 'maps\".\"zone_detail'
        unique_together = (('taxi_zone','datetime'))

# PUMA model in maps schema
class Puma(geomodels.Model):
    id = geomodels.PositiveBigIntegerField(primary_key=True)
    geom = geomodels.MultiPolygonField()

    class Meta:
        managed = True
        db_table = 'maps\".\"puma'

# Places model in maps schema
class Place(geomodels.Model):
    id = geomodels.AutoField(primary_key=True)
    nyc_id = geomodels.CharField(unique=True, max_length=30)
    status = geomodels.CharField(max_length=8)
    last_update = geomodels.DateTimeField(default=timezone.now)
    small_cate = geomodels.CharField(max_length=50)
    big_cate = geomodels.CharField(max_length=50)
    name = geomodels.CharField(max_length=150)
    geom = geomodels.PointField()
    taxi_zone = models.ForeignKey(Zone,related_name='zone_places',on_delete=models.RESTRICT)

    class Meta:
        managed = True
        db_table = 'maps\".\"place'
