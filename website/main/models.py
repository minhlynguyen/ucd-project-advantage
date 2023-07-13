from django.db import models as models
from django.contrib.auth.models import User
from django.contrib.gis.db import models as geomodels
from django.contrib.gis.geos import GEOSGeometry
import json
# Create your models here.

# Taxi zone models in maps schema
class Zone(models.Model):
    id = geomodels.PositiveIntegerField(primary_key=True)
    name = geomodels.CharField(max_length=45)
    borough = geomodels.CharField(max_length=13)
    geom = geomodels.MultiPolygonField()
    class Meta:
        managed = True
        db_table = 'maps\".\"zone'

# PUMA models in maps schema
class Puma(models.Model):
    id = geomodels.PositiveBigIntegerField(primary_key=True)
    geom = geomodels.MultiPolygonField()
    class Meta:
        managed = True
        db_table = 'maps\".\"puma'

# 