from django.utils import timezone
from datetime import datetime
from main.models import Zone
from django.contrib.gis.geos import Point 
from zoneinfo import ZoneInfo


from django.core.management.base import BaseCommand

class Command(BaseCommand):

    def handle(self, *args, **kwargs):

        help = 'Aggregate the number of places for zone_detail'

        # Use this when data is updated
        now=datetime.datetime.now(tz=ZoneInfo("America/New_York"))
        year, month, day= now.strftime("%Y"), now.strftime("%m"), now.strftime("%d")

        # This is for testing
        year, month, day = 2023, 4, 30

        # today = datetime.date(year, month, day)
        # return ZoneDetail.objects.filter(taxi_zone=self, 
        #                                 #  datetime__exact=datetime.strptime("2023-04-30T23:00:00-0400", "%Y-%m-%dT%H:%M:%S%z")
        #                                 datetime__date=datetime.date(year, month, day)
        #                                  )#,

    
        # Rating.objects.values('location_id').filter(attribute__in=attributes).annotate(sum_score=Sum('score')).order_by('-score')
