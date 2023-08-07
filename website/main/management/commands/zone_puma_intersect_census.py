from django.core.management.base import BaseCommand
from main.models import ZonePuma

class Command(BaseCommand):
    def handle(self, *args, **kwargs):
        zone_puma = ZonePuma.objects.all()
        zone_puma = list(zone_puma)
        for intersection in zone_puma:
            weight = intersection.intersection/intersection.zone.geom.area
            intersection.median_income = weight*intersection.puma.median_income
            intersection.females_under_5 = weight*intersection.puma.females_under_5
            intersection.females_5_14 = weight*intersection.puma.females_5_14
            intersection.females_15_24 = weight*intersection.puma.females_15_24
            intersection.females_25_34 = weight*intersection.puma.females_25_34
            intersection.females_35_44 = weight*intersection.puma.females_35_44
            intersection.females_45_54 = weight*intersection.puma.females_45_54
            intersection.females_55_64 = weight*intersection.puma.females_55_64
            intersection.females_65_74 = weight*intersection.puma.females_65_74
            intersection.females_75_84 = weight*intersection.puma.females_75_84
            intersection.females_85 = weight*intersection.puma.females_85
            intersection.males_under_5 = weight*intersection.puma.males_under_5
            intersection.males_5_14 = weight*intersection.puma.males_5_14
            intersection.males_15_24 = weight*intersection.puma.males_15_24
            intersection.males_25_34 = weight*intersection.puma.males_25_34
            intersection.males_35_44 = weight*intersection.puma.males_35_44
            intersection.males_45_54 = weight*intersection.puma.males_45_54
            intersection.males_55_64 = weight*intersection.puma.males_55_64
            intersection.males_65_74 = weight*intersection.puma.males_65_74
            intersection.males_75_84 = weight*intersection.puma.males_75_84
            intersection.males_85 = weight*intersection.puma.males_85
            intersection.save()
            print('Intersection',intersection.id,'is updated')