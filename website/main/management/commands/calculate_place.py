from main.models import Zone
from django.contrib.gis.geos import Point 

from django.core.management.base import BaseCommand

class Command(BaseCommand):

    def handle(self, *args, **kwargs):

        help = 'Finding Zone'
        point = Point(-74.2505, 41.443)
        zone = Zone.objects.get(geom__contains=point)
        zone_list = list(zone)
        print(zone_list)
