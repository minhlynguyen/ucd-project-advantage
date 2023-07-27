from django.utils import timezone
import datetime
from main.models import Zone, ZoneDetail
from django.contrib.gis.geos import Point 
from zoneinfo import ZoneInfo
from main.serializers import ZoneDataSerializer


from django.core.management.base import BaseCommand

class Command(BaseCommand):

    def handle(self, *args, **kwargs):

        help = 'Aggregate the number of places for zone_detail'

        # Use this when data is updated
        # now=datetime.datetime.now(tz=ZoneInfo("America/New_York"))
        # now = timezone.now()
        # year, month, day= now.strftime("%Y"), now.strftime("%m"), now.strftime("%d")
        
        # This would be default, so only need date parameter
        # date = timezone.now().strftime("%Y-%m-%d")        
        
        # from datetime import datetime, timedelta

        # def generate_24_hour_datetimes(date_str):
            # Convert the date string to a datetime object (assuming the date_str format is 'YYYY-MM-DD')
        #     date_obj = datetime.strptime(date_str, '%Y-%m-%d')

        #     # Initialize an empty list to store the 24-hour datetimes
        #     datetime_list = []

        #     # Loop over 24 hours and create datetime objects for each hour
        #     for hour in range(24):
        #         datetime_24_hour = date_obj.replace(hour=hour, minute=0, second=0)
        #         datetime_list.append(datetime_24_hour)

        #     return datetime_list

        # # Example usage:
        # date_str = date
        # result_datetimes = generate_24_hour_datetimes(date_str)

        # # Printing the resulting datetimes
        # for dt in result_datetimes:
        #     print(type(dt))

        # date_obj = datetime.strptime(date_str, '%Y-%m-%d')
        # week = date_obj.weekday()
        # print(week)

        # import holidays
        # us_holidays = dict(holidays.US(years=[2022, 2023]))
        # holiday = us_holidays.get(date_obj, "No")
        # print(holiday)
        # # # This is for testing
        # # year, month, day = 2023, 4, 30

        # # Rating.objects.values('location_id').filter(attribute__in=attributes).annotate(sum_score=Sum('score')).order_by('-score')
        # # https://stackoverflow.com/questions/13403609/how-to-group-by-and-aggregate-with-django

        long = -73.9744619998
        lat = 40.7906900002
        def find_zone(long,lat):
            """Find the taxi_zones that contain a place
            Then create a Place object accordingly"""
            point = Point(float(long),float(lat),srid=4326)
            zone_1 = Zone.objects.filter(geom__bbcontains=point)
            print(list(zone_1))
            zone_2 = Zone.objects.filter(geom__bboverlaps=point)
            print(list(zone_2))
            zone_3 = Zone.objects.filter(geom__contains_properly=point)
            print(list(zone_3))

        find_zone(long,lat)