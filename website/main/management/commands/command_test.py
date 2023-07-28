from django.utils import timezone
import datetime
from main.models import Zone, ZoneDetail, Puma, ZonePuma
from django.contrib.gis.geos import Point 
from zoneinfo import ZoneInfo
from main.serializers import ZoneDataSerializer
import pickle
import pandas as pd
import numpy as np
import pandas as pd
import pyarrow as pa
import pyarrow.parquet as pq
#Import package matplotlib for visualisation/plotting
# import matplotlib.pyplot as plt
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LinearRegression
from sklearn.linear_model import LogisticRegression
from sklearn import metrics
from sklearn.tree import export_graphviz
import xgboost as xgb
from xgboost import XGBRegressor
import csv as csv


from django.core.management.base import BaseCommand

class Command(BaseCommand):

    def handle(self,*args, **kwargs):
        zones = Zone.objects.all()
        pumas = Puma.objects.all()
        for zone in zones:
            zone_geom = zone.geom
            for puma in pumas:
                puma_geom = puma.geom
                if zone_geom.intersects(puma_geom): 
                    try: 
                        intersection=zone_geom.intersection(puma_geom)   
                        zonepuma = ZonePuma(
                            zone = zone,
                            puma = puma,
                            intersection = intersection.area
                        )
                        zonepuma.save()
                        print("Interection of zone", zone.id, "and puma", puma.id, "is created")
                    except Exception as e:
                        print(e)