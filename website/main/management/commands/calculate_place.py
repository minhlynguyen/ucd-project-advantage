from django.utils import timezone
from datetime import datetime
from main.models import Zone
from django.contrib.gis.geos import Point 
from zoneinfo import ZoneInfo


from django.core.management.base import BaseCommand

class Command(BaseCommand):

    def handle(self, *args, **kwargs):

        help = 'Finding Zone'
        # point = Point(-74.2505, 41.443)
        # zone = Zone.objects.get(geom__contains=point)
        # zone_list = list(zone)
        # print(zone_list)

        now=datetime.now(tz=ZoneInfo("America/New_York"))

        today = datetime.strftime(now,"%Y-%m-%d")
        today = datetime.now(tz=ZoneInfo("America/New_York")).strftime("%Y-%m-%d")
        print(today)
        print(type(today))
        year = now.strftime("%Y")
        month = now.strftime("%m")
        day = now.strftime("%d")
        print (year, month, day)
        
