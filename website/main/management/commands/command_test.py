from django.core.management.base import BaseCommand
import datetime
from datetime import timedelta
from django.utils import timezone
from django.db import IntegrityError
from main.models import Place, ZoneDetail, Zone, Puma, ZonePuma
from django.db.models import Count, Q, Sum
from django.utils.timezone import make_aware
import holidays
import time
import csv

class Command(BaseCommand):
   
    def handle(self, *args, **kwargs):

        zones = Zone.objects.all()

        income = zones.values("id").annotate(income=Sum("zone_puma__median_income"),female_5=Sum("zone_puma__females_under_5"))
        # female_under_5 = zones.values("id").annotate().query

        print(income)
        # print(female_under_5)



