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

        zones = ZonePuma.objects.all()


        def aggregate(qs):
            
            field_list = qs[0].__dict__.keys()
            # print(field_list)
            # field_value = qs.values("id").annotate(Avg("zone_puma__"+field))
            # return field_value
            agg = {}
            for field in field_list: 
                if field not in ('_state','id', 'puma','puma_id','zone_id','zone'):
                    field_agg = qs.values("zone").annotate(Avg(field))
                    agg[field_agg['zone_id'][field]] = agg[field_agg[field]]
            return agg
        
        print(len(aggregate(zones)))


        # for zone in blank_zones:
        #     median_income = full_zones.aggregate("median_income")
        #     females_under_5 = full_zones.aggregate("females_under_5")
        #     females_5_14 = full_zones.aggregate("females_5_14")
        #     females_15_24 = full_zones.values("id").annotate(Avg("zne_puma__median_income")),                                                                 
        #     females_25_34 = full_zones.values("id").annotate(Avg("zone_puma__median_income")),
        #     females_35_44 = full_zones.values("id").annotate(Avg("zone_puma__median_income")),
        #     females_45_54 = full_zones.values("id").annotate(Avg("zone_puma__median_income")),
        #     females_55_64 = full_zones.values("id").annotate(Avg("zone_puma__females_55_64")),
        #     females_65_74 = full_zones.values("id").annotate(Avg("zone_puma__females_65_74")),
        #     females_75_84 = full_zones.values("id").annotate(Avg("zone_puma__females_75_84")),weight*intersection.puma.females_75_84
        #     females_85 = full_zones.values("id").annotate(Avg("zone_puma__median_income")),weight*intersection.puma.females_85
        #     males_under_5 = full_zones.values("id").annotate(Avg("zone_puma__median_income")),weight*intersection.puma.males_under_5
        #     males_5_14 = full_zones.values("id").annotate(Avg("zone_puma__median_income")),weight*intersection.puma.males_5_14
        #     males_15_24 = full_zones.values("id").annotate(Avg("zone_puma__median_income")),weight*intersection.puma.males_15_24
        #     males_25_34 = full_zones.values("id").annotate(Avg("zone_puma__median_income")),weight*intersection.puma.males_25_34
        #     males_35_44 = full_zones.values("id").annotate(Avg("zone_puma__median_income")),weight*intersection.puma.males_35_44
        #     males_45_54 = full_zones.values("id").annotate(Avg("zone_puma__median_income")),weight*intersection.puma.males_45_54
        #     males_55_64 = full_zones.values("id").annotate(Avg("zone_puma__median_income")),weight*intersection.puma.males_55_64
        #     males_65_74 = full_zones.values("id").annotate(Avg("zone_puma__median_income")),weight*intersection.puma.males_65_74
        #     males_75_84 = full_zones.values("id").annotate(Avg("zone_puma__median_income")),weight*intersection.puma.males_75_84
        #     males_85 = full_zones.values("id").annotate(Avg("zone_puma__median_income")),weight*intersection.puma.males_85                                             
                                                                 

        # aggregate = other_zones.values("id").annotate(income=Sum("zone_puma__median_income"),female_5=Sum("zone_puma__females_under_5"))
        # # female_under_5 = zones.values("id").annotate().query

        # print(list(aggregate))
        # print(female_under_5)



