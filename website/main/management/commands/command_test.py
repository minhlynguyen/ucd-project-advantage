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

        pass