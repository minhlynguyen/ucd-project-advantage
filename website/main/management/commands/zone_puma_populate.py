from django.core.management.base import BaseCommand
import json
from django.contrib.gis.geos import GEOSGeometry
from main.models import Zone, Puma


class Command(BaseCommand):
    def handle(self, *args, **kwargs):

        #Populate zone table
        if Zone.objects.count()==0:
            with open('../data-ingestions/nyc-taxi-zones.geojson', 'r') as fd:    
                data = json.load(fd)
                for feature in data['features']:
                    geom = GEOSGeometry(str(feature['geometry']))
                    geonameid = feature['properties']['objectid']
                    geoname = feature['properties']['zone']
                    geoborough = feature['properties']['borough']
                    zone = Zone(
                        id=geonameid,
                        geom=GEOSGeometry(geom),
                        name=geoname,
                        borough=geoborough)
                    zone.save()
        else:
            pass

        #Populate Puma table
        if Puma.objects.count()==0:
            with open('../data-ingestions/nyc-pumas.geojson', 'r') as fd:    
                data = json.load(fd)
                for feature in data['features']:
                    geom = GEOSGeometry(str(feature['geometry']))
                    geonameid = feature['properties']['puma']
                    puma = Puma(
                        id=geonameid,
                        geom=GEOSGeometry(geom))
                    puma.save()
        else:
            pass
