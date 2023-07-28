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

    def calculate(self,date):
        """Update the number of hospitals, schools and wifi in a zone in a specific time"""
        
        # Get datetime object from input date string
        date_obj = datetime.strptime(date, '%Y-%m-%d')
        
        # Get the most updated number of businesses
        include = ["Wifi hotspot","Education","Health Care"]
        places = Place.objects.filter(Q(big_cate__in=include),status="Active")
        counts = places.values('taxi_zone_id', 'big_cate').order_by().annotate(Count('id'))
        
        # Generate 24 records corresponding to 24 hour        
        datetime_item_list = self.generate_24_hour_datetimes(date)

        # Define the holiday type of input date
        us_holidays = dict(holidays.US(years=[2022, 2023]))
        holiday = us_holidays.get(date_obj, "No")

        # Define year_month and week
        year_month = date_obj.strftime("%Y-%m")
        week = date_obj.weekday()

        for item in counts:

            # Get the zone info
            zone = Zone.objects.get(pk=item['taxi_zone_id'])
            borough = zone.borough
            hospital = 0
            hotspots = 0
            school = 0
        
            match item['big_cate']:
                case "Health Care":
                    hospital = item['id__count']
                case "Education":
                    school = item['id__count']
                case "Wifi hotspot":
                    hotspots = item['id__count']
                            
            for datetime_item in datetime_item_list:
                try:
                    # Check if that zone and that time are in already in database
                    obj = ZoneDetail.objects.get(taxi_zone_id=item['taxi_zone_id'],datetime=make_aware(datetime_item))
                    
                    # If exists, update latest calculation:
                    obj.year_month = year_month
                    obj.week = week
                    obj.hour = datetime_item.strftime("%H")
                    obj.borough = borough
                    obj.hospital = hospital
                    obj.school = school
                    obj.hotspots = hotspots
                    obj.save()
                    print('Zone detail item',obj.zone_time_id,'updated')

                except ZoneDetail.DoesNotExist:

                    # If not exists, create a new record
                    obj = ZoneDetail(
                        taxi_zone = zone,
                        datetime = make_aware(datetime_item),
                        year_month = year_month,
                        week = week,
                        hour = datetime_item.strftime("%H"),
                        borough = borough,
                        hospital = hospital,
                        hotspots = hotspots,
                        school = school,
                        holiday = holiday
                    )
                    obj.save()
                    print('Zone',zone.id,'Time',datetime_item,' created')

    def add_arguments(self , parser):
        parser.add_argument('date' , nargs='?' , type=str, 
        help='Date of zone detail you want to update the number of places',
        default = timezone.now().strftime("%Y-%m-%d"))

    def handle(self, *args, **kwargs):
        date = kwargs['date']
        self.calculate(date)
        