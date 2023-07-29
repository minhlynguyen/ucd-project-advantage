from django.core.management.base import BaseCommand
import datetime
from datetime import timedelta
from django.utils import timezone
from django.db import IntegrityError
from main.models import Place, ZoneDetail, Zone, Puma
from django.db.models import Count, Q
from django.utils.timezone import make_aware
import holidays
import time
import csv

class Command(BaseCommand):

   
    def handle(self, *args, **kwargs):
        with open('../data-ingestions/census.csv', 'r') as fd:    
            next(fd)
            csvread = csv.reader(fd)
            rows = []
            for row in csvread:
                rows.append(row)
                puma = Puma.objects.get(id=row[0])
                puma.median_income = row[1]
                puma.females_under_5 = row[2]
                puma.females_5_14 = row[3]
                puma.females_15_24 = row[4]
                puma.females_25_34 = row[5]
                puma.females_35_44 = row[6]
                puma.females_45_54 = row[7]
                puma.females_55_64 = row[8]
                puma.females_65_74 = row[9]
                puma.females_75_84 = row[10]
                puma.females_85 = row[11]
                puma.males_under_5 = row[12]
                puma.males_5_14 = row[13]
                puma.males_15_24 = row[14]
                puma.males_25_34 = row[15]
                puma.males_35_44 = row[16]
                puma.males_45_54 = row[17]
                puma.males_55_64 = row[18]
                puma.males_65_74 = row[19]
                puma.males_75_84 = row[20]
                puma.males_85 = row[21]
                puma.main_demographic = row[22]
                puma.save()
                print('puma',row[0],'updated')