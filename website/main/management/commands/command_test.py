from django.core.management.base import BaseCommand
import datetime
from datetime import timedelta
from django.utils import timezone
from django.db import IntegrityError
from main.models import Place, ZoneDetail, Zone, Puma, ZonePuma
from django.db.models import Count, Q, Sum, Avg
from django.utils.timezone import make_aware
import holidays
import time
import csv

class Command(BaseCommand):
   
    def handle(self, *args, **kwargs):

        Zone.objects.filter(zone_puma__isnull=True)

        # max_year = ZoneDetail.objects.filter(prediction_last_update__isnull=False).latest('datetime')
        # print(max_year.datetime)
        # run_date = timezone.now()
        
        # def get_ymd(date_str):
        #     y, m, d = date_str.strftime("%Y"),date_str.strftime("%m"),date_str.strftime("%d")
        #     return int(y), int(m), int(d)
        
        # zone = ZoneDetail.objects.filter(Q(prediction_last_update__isnull=True)
        #                                      | Q(prediction_last_update__date__lte=datetime.date(get_ymd(run_date)[0],
        #                                                                                          get_ymd(run_date)[1],
        #                                                                                          get_ymd(run_date)[2])))
        # print(len(list(zone)))

        # latest_data = ZoneDetail.objects.filter(prediction_last_update__isnull=False).latest("datetime")
        # default_end = latest_data.datetime.strftime('%Y-%m-%d')
        # print(default_end)

        # today = timezone.now()
        # default_start = today.strftime('%Y-%m-%d')
        # print(default_start)
