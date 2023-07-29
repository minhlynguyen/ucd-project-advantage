from django.core.management.base import BaseCommand
from datetime import datetime
from django.utils import timezone
from main.models import Place, ZoneDetail, Zone
from django.db.models import Count, Q
from django.utils.timezone import make_aware
import holidays


class Command(BaseCommand):

    def generate_24_hour_datetimes(self,date_str):
            # Convert the date string to a datetime object (assuming the date_str format is 'YYYY-MM-DD')
            date_obj = datetime.strptime(date_str, '%Y-%m-%d')

            # Initialize an empty list to store the 24-hour datetimes
            datetime_list = []

            # Loop over 24 hours and create datetime objects for each hour
            for hour in range(24):
                datetime_24_hour = date_obj.replace(hour=hour, minute=0, second=0)
                datetime_list.append(datetime_24_hour)

            return datetime_list

    def calculate_business(self,date):
        """Calculate the number of business in a zone"""

        # Get the datetime object from input string
        date_obj = datetime.strptime(date, '%Y-%m-%d')
        
        # Get the most updated number of businesses
        exclude = ["Wifi hotspot","Education","Health Care"]
        businesses = Place.objects.filter(~Q(big_cate__in=exclude),last_update__date=date_obj)
        # businesses = places.exclude(exclude)
        counts = businesses.values('taxi_zone_id', 'big_cate').order_by().annotate(Count('id'))
        
        # Generate 24 records corresponding to 24 hour        
        datetime_item_list = self.generate_24_hour_datetimes(date)

        # Define the holiday type of input date
        us_holidays = dict(holidays.US(years=[2022, 2023]))
        holiday = us_holidays.get(date_obj, "No")

        # Define month and week
        month = date_obj.strftime("%-m")
        hour = datetime_item.strftime("%-H")
        week = date_obj.weekday()

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

            total_business = (entertainment_and_recreation + financial_services + food_and_beverage + parking_and_automotive_services + 
                              professional_services + real_estate + retail_services + transportation)

            
            for datetime_item in datetime_item_list:
                try:
                    # Check if a record in already in database
                    obj = ZoneDetail.objects.get(taxi_zone_id=item['taxi_zone_id'],datetime=make_aware(datetime_item))
                    
                    # If exists, update latest calculation:
                    # obj.month = month
                    # obj.week = week
                    # obj.hour = datetime_item.strftime("%H")
                    # obj.borough = borough
                    obj.entertainment_and_recreation = entertainment_and_recreation
                    obj.financial_services = financial_services
                    obj.food_and_beverage = food_and_beverage
                    obj.parking_and_automotive_services = parking_and_automotive_services
                    obj.professional_services = professional_services
                    obj.real_estate = real_estate
                    obj.retail_services = retail_services
                    obj.transportation = transportation
                    obj.total_business = total_business           
                    # obj.holiday = holiday
                    obj.save()
                    print('Zone detail item updated')
                
                except ZoneDetail.DoesNotExist:

                    # If exists, create new object
                    obj = ZoneDetail(
                        taxi_zone = zone,
                        datetime = make_aware(datetime_item),
                        month = month,
                        week = week,
                        hour = hour,
                        borough = borough,
                        entertainment_and_recreation = entertainment_and_recreation,
                        financial_services = financial_services,
                        food_and_beverage = food_and_beverage,
                        parking_and_automotive_services = parking_and_automotive_services,
                        professional_services = professional_services,
                        real_estate = real_estate,
                        retail_services = retail_services,
                        transportation = transportation,
                        total_business = total_business,           
                        holiday = holiday
                    )
                    obj.save()
                    print('Zone detail item created')
        
    def add_arguments(self , parser):
        parser.add_argument('date' , nargs='?' , type=str, 
        help='Date of zone detail you want to update the number of places',
        default = timezone.now().strftime("%Y-%m-%d"))

    def handle(self, *args, **kwargs):
        date = kwargs['date']
        self.calculate_business(date)
        