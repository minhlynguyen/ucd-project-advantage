from django.db import models as models
from django.contrib.auth.models import User
from django.contrib.gis.db import models as geomodels
from django.contrib.gis.geos import GEOSGeometry
import json
# Create your models here.

# Advertiser models
class Advertiser(models.Model):
    user=models.ForeignKey(User,on_delete=models.CASCADE)
    address=models.TextField(null=True)

# Billboard vendor models
# class BillboardVendor(models.Model):
#     user=models.ForeignKey(User,on_delete=models.CASCADE)

# Taxi zone models in public schema
## Create table
# class TaxiZone(geomodels.Model):
#     id = geomodels.PositiveIntegerField(primary_key=True)
#     name = geomodels.CharField(max_length=45)
#     borough = geomodels.CharField(max_length=13)
#     geom = geomodels.MultiPolygonField()
## Populate data

# def taxi_zone_populate(model):
#     with open('../data-ingestions/nyc-taxi-zones.geojson', 'r') as fd:    
#         data = json.load(fd)
#         for feature in data['features']:
#             geom = GEOSGeometry(str(feature['geometry']))
#             geonameid = feature['properties']['objectid']
#             geoname = feature['properties']['zone']
#             geoborough = feature['properties']['borough']
#             zone = model(
#                 id=geonameid,
#                 geom=GEOSGeometry(geom),
#                 name=geoname,
#                 borough=geoborough)
#             zone.save()

# Taxi zone models in maps schema
## Create table
class Zone(models.Model):
    id = geomodels.PositiveIntegerField(primary_key=True)
    name = geomodels.CharField(max_length=45)
    borough = geomodels.CharField(max_length=13)
    geom = geomodels.MultiPolygonField()
    class Meta:
        managed = True
        db_table = 'maps\".\"zone'

## Populate
# taxi_zone_populate(Zone)

# PUMA models in maps schema
class Puma(models.Model):
    id = geomodels.PositiveBigIntegerField(primary_key=True)
    geom = geomodels.MultiPolygonField()
    class Meta:
        managed = True
        db_table = 'maps\".\"puma'