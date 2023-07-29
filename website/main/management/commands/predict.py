import numpy as np
import pandas as pd
from django.core.management.base import BaseCommand
import pyarrow as pa
import pyarrow.parquet as pq
from django.db.models import Count, Q
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
import pickle
from main.models import ZoneDetail
import datetime

class Command(BaseCommand):
    
    def handle(self, *args, **kwargs):

        help = 'Predict busyness'
        try:
            zone = ZoneDetail.objects.filter(Q(impression_predict__isnull=True) | Q(impression_predict=-1)
                )
            
            # Convert the data into pandas dataframe and process before feeding into model
            df = pd.DataFrame.from_records(zone.values())
            
            # Rename column to match with training data
            df.columns = df.columns.str.replace('taxi_zone_id', 'taxi_zone')
            df.columns = df.columns.str.replace('impression_predict', 'passenger_count')
            
            # Change datatype
            df['taxi_zone'] = df['taxi_zone'].astype('category')
            df['month'] = df['month'].astype('category')
            df['week'] = df['week'].astype('category')
            df['hour'] = df['hour'].astype('category')
            df['holiday'] = df['holiday'].astype('category')
            df['borough'] = df['borough'].astype('category')
            df['passenger_count'] = df['passenger_count'].fillna(-1).astype(int)
            
            # print existing categories:
            taxi_zone_cate = []
            for i in range(1,264):
                if i not in (103,104):
                    taxi_zone_cate.append(i)

            df['taxi_zone'] = df['taxi_zone'].cat.set_categories(taxi_zone_cate)
            df['week'] = df["week"].cat.set_categories(['0','1','2','3','4','5','6'])
            df['hour'] = df["hour"].cat.set_categories(['0','1','2','3','4','5','6','7','8','9','10','11','12',
                                                    '13','14','15','16','17','18','19','20','21','22','23'])
            
            # print(df[df['hour'].isnull()])

            df['borough'] = df['borough'].cat.set_categories(['Bronx', 'Brooklyn', 'EWR', 'Manhattan', 'Queens', 
                                                            'Staten Island'])
            df['month'] = df['month'].cat.set_categories(['1','2','3','4','5','6','7','8','9','10','11','12'])

            df['holiday'] = df['holiday'].cat.set_categories(['Christmas Day','Christmas Day (Observed)',
                                                            'Columbus Day','Independence Day','Labor Day',
                                                            'Martin Luther King Jr. Day', 'Memorial Day',
                                                            "New Year's Day", "New Year's Day (Observed)","No",
                                                            "Thanksgiving","Veterans Day","Washington's Birthday"
                                                            ])
                                                                
            # Keep the primary key to match the results later
            df_pk = df[['zone_time_id','taxi_zone','impression_history','datetime']]
                        
            df = df.drop(labels=['zone_time_id','impression_history','datetime'], axis=1)

            # set up dummies features
            df_dummy = pd.get_dummies(df)
            
            # split data set into the features and target feature
            target_features=df_dummy[['passenger_count']]
            features = df_dummy.drop(labels=["passenger_count"], axis=1)
            
            # load the trained model
            loaded_model = pickle.load(open('../website/main/final_XGboost_model.pkl', 'rb'))
            
            # feed the model
            predictions = loaded_model.predict(features)
            predictions[predictions < 0] = 0
            predictions = predictions.astype(int)

            # convert prediction to a dataframe
            predictions_df = pd.DataFrame(predictions, columns=['predicted_passenger_count'])

            # concatenate the target_feature, features and primary key dataframes
            result = pd.concat([df_pk, predictions_df, target_features, features], axis=1)

            # print(result.dtypes)
            
            # write prediction result in database
            for index, row in result.iterrows():
                try: 
                    zone.filter(zone_time_id=row['zone_time_id']).update(impression_predict=int(row['predicted_passenger_count']))
                    print('Record no.',row['zone_time_id'],'Zone no.',row['taxi_zone'],'Time',row['datetime'],'updated prediction')
                except Exception as e:
                    print(e)                    

        except Exception as e:
            print(e)