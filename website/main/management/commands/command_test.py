from django.core.management.base import BaseCommand
from django.core import management
from io import StringIO
from django.dispatch import receiver
from main.models import Place
import json
from django.core.serializers import serialize


class Command(BaseCommand):
     def handle(self, *args, **options):
         places = serialize('geojson',Place.objects.filter(taxi_zone_id=999,status="Active"))
         places_json = json.loads(places)
         print(places_json)
         print(type(places_json['features']))