# This script is to update the current impression to Taxi Zones models
# Frequency is Every hour
# https://stackoverflow.com/questions/1601153/django-custom-command-and-cron
# https://medium.com/@bencleary/django-schedule-tasks-664649be2dea


from django.core.management.base import BaseCommand

from main.models import ZoneDetail
from datetime import datetime

class Command(BaseCommand):
    
    def handle(self, *args, **kwargs):

        help = 'Reading Business API'

        zone_detail = ZoneDetail.objects.filter(
            datetime__exact=datetime.strptime("2023-04-30T23:00:00-0400", "%Y-%m-%dT%H:%M:%S%z") #Will update to last 24hours later)
        )

        for zone in zone_detail:
            try: 
                zone.taxi_zone.current_impression = zone.impression_history
                zone.taxi_zone.save()
            except Exception as e:
                print(e)