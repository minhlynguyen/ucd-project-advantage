from django.core.management.base import BaseCommand
import datetime
from datetime import timedelta
from django.utils import timezone
from django.db import IntegrityError
from main.models import Place, ZoneDetail, Zone
from django.db.models import Count, Q
from django.utils.timezone import make_aware
import holidays
import time

class Command(BaseCommand):

    def generate_24_hour_datetimes(self,date_str):
            # Convert the date string to a datetime object (assuming the date_str format is 'YYYY-MM-DD')
            # date_obj = datetime.datetime.strptime(date_str, '%Y-%m-%d')

            # Initialize an empty list to store the 24-hour datetimes
            datetime_list = []

            # Loop over 24 hours and create datetime objects for each hour
            for hour in range(24):
                datetime_24_hour = date_str.replace(hour=hour, minute=0, second=0)
                datetime_list.append(datetime_24_hour)

            return datetime_list
    
    def aggregate(self):
        """Aggregate the latest number of active business by zones and category"""
        # Get the most updated number of businesses
        print("Aggregating businesses ...",end="\t")
        businesses = Place.objects.filter(status="Active")
        counts = businesses.values('taxi_zone_id', 'big_cate').order_by().annotate(Count('id'))
        aggregate = []
        for item in counts:
            zone = Zone.objects.get(pk=item['taxi_zone_id'])
            borough = zone.borough
            entertainment_and_recreation = 0
            financial_services = 0
            food_and_beverage = 0
            parking_and_automotive_services = 0
            professional_services = 0
            real_estate = 0
            retail_services = 0
            transportation = 0
            total_business = 0
            hospital = 0
            hotspots = 0
            school = 0
        
            match item['big_cate']:
                case "Entertainment and Recreation":
                    entertainment_and_recreation = item['id__count']
                case "Financial Services":
                    financial_services = item['id__count']
                case "Food and Beverage":
                    food_and_beverage = item['id__count']
                case "Parking and Automotive Services":    
                    parking_and_automotive_services = item['id__count']
                case "Professional Services":
                    professional_services = item['id__count']
                case "Real Estate":    
                    real_estate = item['id__count']
                case "Retail Services":
                    retail_services = item['id__count']
                case "Transportation":                    
                    transportation = item['id__count']
                case "Health Care":
                    hospital = item['id__count']
                case "Education":
                    school = item['id__count']
                case "Wifi hotspot":
                    hotspots = item['id__count']

            total_business = (entertainment_and_recreation + financial_services + food_and_beverage + parking_and_automotive_services + 
                              professional_services + real_estate + retail_services + transportation)
            
            aggregate_zone = {"taxi_zone_id": item['taxi_zone_id'],
                         "borough": borough,
                         "entertainment_and_recreation": entertainment_and_recreation,
                         "financial_services": financial_services, 
                         "food_and_beverage": food_and_beverage, 
                         "parking_and_automotive_services": parking_and_automotive_services,
                         "professional_services": professional_services, 
                         "real_estate": real_estate, 
                         "retail_services": retail_services, 
                         "transportation": transportation, 
                         "total_business": total_business, 
                         "hospital": hospital, 
                         "school": school,
                         "hotspots" : hotspots
                         }
            aggregate.append(aggregate_zone)
        print("Finished calculating, writing to database ... ",end="\t")
        return aggregate

    def populate_business(self, date, aggregate):

        # Get the datetime object from input string
        # date_obj = datetime.datetime.strptime(date, '%Y-%m-%d')
        
        # Record script running time:
        place_last_update = timezone.now()

        # Generate 24 records corresponding to 24 hour        
        datetime_item_list = self.generate_24_hour_datetimes(date)

        # Define the holiday type of input date
        us_holidays = dict(holidays.US(years=[2022, 2023]))
        holiday = us_holidays.get(date, "No")

        # Define month and week
        month = date.strftime("%-m")
        week = date.weekday()

        for datetime_item in datetime_item_list:
            for item in aggregate:

                obj, created = ZoneDetail.objects.get_or_create(
                    taxi_zone_id = item['taxi_zone_id'],
                    datetime = make_aware(datetime_item),
                    month = month,
                    week = week,
                    hour = datetime_item.strftime("%-H"),
                    borough = item['borough'],
                    entertainment_and_recreation = item['entertainment_and_recreation'],
                    financial_services = item['financial_services'],
                    food_and_beverage = item['food_and_beverage'],
                    parking_and_automotive_services = item['parking_and_automotive_services'],
                    professional_services = item['professional_services'],
                    real_estate = item['real_estate'],
                    retail_services = item['retail_services'],
                    transportation = item['transportation'],
                    total_business = item['total_business'], 
                    hospital = item['hospital'],
                    hotspots = item['hotspots'],
                    school = item['school'],
                    holiday = holiday,
                )

                if (created==False):

                    # obj.place_last_update = datetime.datetime.strftime(place_last_update,"%Y-%m- %d%H:%M:%S%Z%z")
                    obj.entertainment_and_recreation = item['entertainment_and_recreation']
                    obj.financial_services = item['financial_services']
                    obj.food_and_beverage = item['food_and_beverage']
                    obj.parking_and_automotive_services = item['parking_and_automotive_services']
                    obj.professional_services = item['professional_services']
                    obj.real_estate = item['real_estate']
                    obj.retail_services = item['retail_services']
                    obj.transportation = item['transportation']
                    obj.total_business = item['total_business']
                    obj.hospital = item['hospital']
                    obj.school = item['school']
                    obj.hotspots = item['hotspots']          
                    # obj.holiday = holiday
                    obj.save()
                    print('Zone',item['taxi_zone_id'],'Time',datetime_item,'updated')
    
    def add_arguments(self , parser):
        
        today = timezone.now()

        parser.add_argument('start' , nargs='?' , type=str, 
        help='Date of zone detail you want to start updating the number of places',
        default = today.strftime("%Y-%m-%d"))

        next_2_month = today+datetime.timedelta(days=60)

        parser.add_argument('end' , nargs='?' , type=str, 
        help='Date of zone detail you want to end updating the number of places',
        default = next_2_month.strftime("%Y-%m-%d"))


    def handle(self, *args, **kwargs):

        print("Initialising ...",end="\t")

        start_date = datetime.datetime.strptime(kwargs['start'],"%Y-%m-%d")
        end_date = datetime.datetime.strptime(kwargs['end'], "%Y-%m-%d")

        print("Duration set ... Loading aggregate fuction ...",end="\t")
        
        aggregate = self.aggregate()

        def daterange(start_date, end_date):
            for n in range(int((end_date - start_date).days)):
                yield start_date + timedelta(n)

        # for single_date in daterange(start_date, end_date):
        #     print(single_date.strftime("%Y-%m-%d"))

        for date in daterange(start_date,end_date):
            print("Writing to Zone detail for", date, "...",end="\t")
            self.populate_business(date,aggregate)
        
        # start = time.time()

        # while True:
        #     current_time = time.time()
        #     if current_time - start >= 15:
        #         print('.',end=" ")
        #         start = current_time