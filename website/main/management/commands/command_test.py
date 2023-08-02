import pandas as pd
from django.core.management.base import BaseCommand
from django.db.models import Q
from django.utils import timezone
import pickle, datetime, holidays, warnings
from main.models import ZoneDetail
from django.db import transaction, connection
from psycopg2.extras import execute_values
from django.dispatch import Signal

from decouple import config
import psycopg2

class Command(BaseCommand):

    def predict(self, predict_start_date, predict_end_date):

        predict_start_date = datetime.datetime.strptime(predict_start_date,"%Y-%m-%d")
        predict_end_date = datetime.datetime.strptime(predict_end_date,"%Y-%m-%d")
        run_date = timezone.now()
        
        def get_ymd(date_str):
            y, m, d = date_str.strftime("%Y"),date_str.strftime("%m"),date_str.strftime("%d")
            return int(y), int(m), int(d)
        
        help = 'Predict busyness'
        try:
            zone = ZoneDetail.objects.filter(Q(prediction_last_update__isnull=True) | 
                                                Q(prediction_last_update__date__lte=datetime.date(get_ymd(run_date)[0],
                                                                                                    get_ymd(run_date)[1],
                                                                                                    get_ymd(run_date)[2]))
                                                ).filter(datetime__date__gte=datetime.date(get_ymd(predict_start_date)[0],
                                                                                    get_ymd(predict_start_date)[1],
                                                                                    get_ymd(predict_start_date)[2])
                                                    ).filter(datetime__date__lte=datetime.date(get_ymd(predict_end_date)[0],
                                                                                    get_ymd(predict_end_date)[1],
                                                                                    get_ymd(predict_end_date)[2])
                                                    )
            
            
            # Convert the data into pandas dataframe and process before feeding into model
            df = pd.DataFrame.from_records(zone.values())

            # Create a dictionary of US holidays for 2022 and 2023
            us_holidays = dict(holidays.US(years=[2022, 2023]))

            # Assuming df is your DataFrame and 'datetime' is your date column
            # First, ensure that your 'datetime' column is indeed a datetime object
            df['datetime'] = pd.to_datetime(df['datetime'])

            # Change holiday column
            # otherwise, it will be "No"
            df['holiday'] = df['datetime'].dt.date.apply(lambda x: us_holidays.get(x, "No"))
            
            # Rename column to match with training data
            df.columns = df.columns.str.replace('taxi_zone_id', 'taxi_zone')
            df.columns = df.columns.str.replace('impression_predict','passenger_count')
            
            # Change datatype
            df['taxi_zone'] = df['taxi_zone'].astype('category')
            df['month'] = df['month'].astype('category')
            df['week'] = df['week'].astype('category')
            df['hour'] = df['hour'].astype('category')
            df['holiday'] = df['holiday'].astype('category')
            df['borough'] = df['borough'].astype('category')
            df['passenger_count'] = df['passenger_count'].fillna(-1).astype(int)

            # print(df.dtypes)

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
                                                                
            # Keep the primary key and needed info to match and concat the results later
            df_pk = df[['zone_time_id','holiday','taxi_zone','datetime']]
                        
            df = df.drop(labels=['zone_time_id','impression_history','datetime','place_last_update','prediction_last_update'], axis=1)

            # set up dummies features
            df_dummy = pd.get_dummies(df)
            
            # split data set into the features and target feature
            # target_features=df_dummy[['passenger_count']]
            features = df_dummy.drop(labels=["passenger_count"], axis=1)

            # print(features.dtypes)
            
            # load the trained model
            loaded_model = pickle.load(open('../website/main/final_XGboost_model.pkl', 'rb'))
            
            # feed the model
            predictions = loaded_model.predict(features)
            predictions[predictions < 0] = 0
            predictions = predictions.astype(int)

            # convert prediction to a dataframe
            predictions_df = pd.DataFrame(predictions, columns=['predicted_passenger_count'])

            # concatenate the target_feature, features and primary key dataframes
            result = pd.concat([df_pk, predictions_df], axis=1)
            result.rename(columns = {'predicted_passenger_count':'impression_predict'}, inplace = True)

            # Convert DataFrame to a list of tuples for bulk insert
            self.data = [(row["zone_time_id"], row["holiday"], row["impression_predict"], row['taxi_zone']) for _, row in result.iterrows()]
            print(self.data[0])

            # Create a cursor to execute SQL queries
            # Database connection details

            self.db_host = "database-1.cvwut6jnqsvn.us-east-1.rds.amazonaws.com"
            self.db_name = "advantage-db"
            self.db_user = "advantage"
            self.db_password = config("DB_PASSWORD")

            connection = psycopg2.connect(
                host=self.db_host,
                database=self.db_name,
                user=self.db_user,
                password=self.db_password,
            )

            # Read and execute the SQL script
            print("Connection is created.")
            sql_script = """
                UPDATE maps.zone_detail
                SET impression_predict = v.impression_predict::integer,
                    holiday = v.holiday,
                    prediction_last_update = NOW()
                FROM (VALUES %s) AS v (zone_time_id, holiday, impression_predict)
                WHERE zone_detail.zone_time_id = v.zone_time_id
                ;
            """
            try:
                with connection.cursor() as cursor:
                    print("Running query.")
                    execute_values(cursor, sql_script, self.data)
                    connection.commit()
            finally:
                connection.close()
                print("Connection is closed.")

        except Exception as e:
            print(e)
        

    def add_arguments(self , parser):
        today = timezone.now()
        default_start = today.strftime('%Y-%m-%d')
        parser.add_argument('start' , nargs='?', type=str, default=default_start,
        help='Prediction is run to predict data from today by default.'
        )

        latest_data = ZoneDetail.objects.filter(prediction_last_update__isnull=False).latest("datetime")
        default_end = latest_data.datetime.strftime('%Y-%m-%d')
        parser.add_argument('end', nargs='?', type=str, default=default_end,
        help='Prediction is run to predict data to the latest day we have business data by default.'
        )
    
    def handle(self, *args, **kwargs):
        start_date = kwargs['start']
        end_date = kwargs['end']
        self.predict(start_date,end_date)
        return str(self.data)
