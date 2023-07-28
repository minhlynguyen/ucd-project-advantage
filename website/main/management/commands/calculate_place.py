from django.utils import timezone
import datetime
from main.models import Zone, ZoneDetail
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
import time


from django.core.management.base import BaseCommand

class Command(BaseCommand):

    def handle(self, *args, **kwargs):

        help = 'Aggregate the number of places for zone_detail'

        # # Rating.objects.values('location_id').filter(attribute__in=attributes).annotate(sum_score=Sum('score')).order_by('-score')
        # # https://stackoverflow.com/questions/13403609/how-to-group-by-and-aggregate-with-django

        # test loading the model: DONE
        loaded_model = pickle.load(open('../data-analytics/model_2/basic_XGboost_model_2.2.pkl', 'rb'))
        # print(loaded_model)

        # get the data from database
        # zone = ZoneDetail.objects.filter(impression_predict__isnull=True)
        zone = ZoneDetail.objects.all()
        df = pd.DataFrame(list(zone.values('entertainment_and_recreation', 'financial_services', 
                                           'food_and_beverage', 'parking_and_automotive_services',
                                           'professional_services', 'real_estate', 'retail_services', 
                                           'transportation', 'hospital', 'hotspots', 'school',
                                           'total')))
        print(df.head(5))









        # def get_dummy_variable(data, categories):
        #     dummy_dict = {}
        #     for category in categories:
        #         dummy_list = [1 if item == category else 0 for item in data]
        #         dummy_dict[category] = dummy_list
        #     return dummy_dict

        #     # Example usage:
        # data = ['entertainment_and_recreation','real_estate']
        # categories = ['entertainment_and_recreation', 'financial_services', 'food_and_beverage', 'parking_and_automotive_services',
        #                 'professional_services', 'real_estate', 'retail_services', 'transportation', 'hospital', 'hotspots', 'school']
        # dummy_variables = get_dummy_variable(data, categories)

        # for category, dummy_list in dummy_variables.items():
            # print(f"{category}: {dummy_list}")

        
        # predictions = loaded_model.predict(input)
        # print(predictions)
