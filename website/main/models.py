from django.db import models as models
from django.contrib.auth.models import User
# Create your models here.

# Advertiser models
class Advertiser(models.Model):
    user=models.ForeignKey(User,on_delete=models.CASCADE)
    address=models.TextField(null=True)

# Billboard vendor models
# class BillboardVendor(models.Model):
#     user=models.ForeignKey(User,on_delete=models.CASCADE)

# Taxi zone models
from django.contrib.gis.db import models as geomodels
from django.contrib.gis.geos import GEOSGeometry
import json


class TaxiZones(geomodels.Model):
    id = geomodels.PositiveIntegerField(primary_key=True)
    geom = geomodels.MultiPolygonField()
    name = geomodels.CharField(max_length=45)
    
with open('../data-ingestions/nyc-taxi-zones.geojson', 'r') as fd:
    data = json.load(fd)

    for feature in data['features']:
        geom = GEOSGeometry(str(feature['geometry']))
        geonameid = feature['properties']['objectid']
        geoname = feature['properties']['zone']
        zone = TaxiZones(
            id=geonameid,
            geom=GEOSGeometry(geom),
            name=geoname)
        zone.save()