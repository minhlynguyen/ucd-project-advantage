import numpy as np
import pandas as pd
from django.core.management.base import BaseCommand
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
import pickle
from main.models import ZoneDetail
import datetime

class Command(BaseCommand):
    
    def handle(self, *args, **kwargs):

        help = 'Predict busyness'
        # try:
        zone = ZoneDetail.objects.filter(impression_predict__isnull=True)
        
        # Convert the data into pandas dataframe and process before feeding into model
        df = pd.DataFrame.from_records(zone.values())
        
        # Rename column to match with training data
        df.columns = df.columns.str.replace('taxi_zone_id', 'taxi_zone')
        df.columns = df.columns.str.replace('impression_predict', 'passenger_count')
        
        # 
        print(df.dtypes)
        # Change datatype
        # df['taxi_zone'] = df['taxi_zone'].astype('category')
        # df['month'] = df['month'].astype('category')
        # df['week'] = df['week'].astype('category')
        # df['hour'] = df['hour'].astype('category')
        # df['holiday'] = df['holiday'].astype('category')
        # df['borough'] = df['borough'].astype('category')
        # df['taxi_zone'] = pd.Categorical(df['taxi_zone'], categories=['1','2','3','4','5','6','7','8','9','10',
        #                                                     '11','12','13','14','15','16','17','18','19','20',
        #                                                     '21','22','23','24','25','26','27','28','29','30',
        #                                                     '31','32','33','34','35','36','37','38','39','40',
        #                                                     '41','42','43','44','45','46','47','48','49','50',
        #                                                     '51','52','53','54','55','56','57','58','59','60',
        #                                                     '61','62','63','64','65','66','67','68','69','70',
        #                                                     '71','72','73','74','75','76','77','78','79','80',
        #                                                     '81','82','83','84','85','86','87','88','89','90',
        #                                                     '91','92','93','94','95','96','97','98','99','100',
        #                                                     '101','102','105','106','107','108','109','110',
        #                                                     '111','112','113','114','115','116','117','118',
        #                                                     '119','120','121','122','123','124','125','126',
        #                                                     '127','128','129','130','131','132','133','134',
        #                                                     '135','136','137','138','139','140','141','142',
        #                                                     '143','144','145','146','147','148','149','150',
        #                                                     '151','152','153','154','155','156','157','158',
        #                                                     '159','160','161','162','163','164','165','166',
        #                                                     '167','168','169','170','171','172','173','174',
        #                                                     '175','176','177','178','179','180','181','182',
        #                                                     '183','184','185','186','187','188','189','190',
        #                                                     '191','192','193','194','195','196','197','198',
        #                                                     '199','200','201','202','203','204','205','206',
        #                                                     '207','208','209','210','211','212','213','214',
        #                                                     '215','216','217','218','219','220','221','222',
        #                                                     '223','224','225','226','227','228','229','230',
        #                                                     '231','232','233','234','235','236','237','238',
        #                                                     '239','240','241','242','243','244','245','246',
        #                                                     '247','248','249','250','251','252','253','254',
        #                                                     '255','256','257','258','259','260','261','262',
        #                                                     '263'])
        # df['week'] = pd.Categorical(df['week'], categories=['0','1','2','3','4','5','6'])
        # df['hour'] = pd.Categorical(df['hour'], categories=['0','1','2','3','4','5','6','7','8','9','10','11','12',
        #                                         '13','14','15','16','17','18','19','20','21','22','23'])
        # df['borough'] = pd.Categorical(df['borough'], categories=['Bronx', 'Brooklyn', 'EWR', 'Manhattan', 'Queens', 
        #                                                 'Staten Island'])
        # df['month'] = pd.Categorical(df['month'], categories=['1','2','3','4','5','6','7','8','9','10','11','12'])
        # df['holiday'] = pd.Categorical(df['holiday'], categories=['Christmas Day','Christmas Day (Observed)',
        #                                                 'Columbus Day','Independence Day','Labor Day',
        #                                                 'Martin Luther King Jr. Day', 'Memorial Day',
        #                                                 "New Year's Day", "New Year's Day (Observed)","No",
        #                                                 "Thanksgiving","Veterans Day","Washington's Birthday"
        #                                                 ])
        
        # # Keep the primary key to match the results later
        # df_pk = df[['zone_time_id','impression_history','datetime']]
        # df = df.drop(labels=['zone_time_id','impression_history','datetime'], axis=1)

        # # set up dummies features
        # df_dummy = pd.get_dummies(df)
        
        # # split data set into the features and target feature
        # target_features=df_dummy[['passenger_count']]
        # features = df_dummy.drop(labels=["passenger_count"], axis=1)
        
        # # load the trained model
        # loaded_model = pickle.load(open('../website/main/final_XGboost_model.pkl', 'rb'))
        
        # # feed the model
        # predictions = loaded_model.predict(features)
        # predictions[predictions < 0] = 0
        # predictions = predictions.astype(int)

        # # convert prediction to a dataframe
        # predictions_df = pd.DataFrame(predictions, columns=['predicted_passenger_count'])

        # # concatenate the target_feature, features and primary key dataframes
        # result = pd.concat([df_pk, predictions_df, target_features, features], axis=1)

        # # write prediction result in database
        # for row in result.iterrows():
        #     try: 
        #         zone.filter(zone_time_id=row['zone_time_id']).update(impression_predict=row['predicted_passenger_count'])
        #         print(row['zone_time_id'],'updated prediction')
        #     except Exception as e:
        #         print(e)                    

        # # except Exception as e:
        # #     print(e)