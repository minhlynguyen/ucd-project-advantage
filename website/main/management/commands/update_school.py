from django.core.management.base import BaseCommand
from sodapy import Socrata
from datetime import datetime
from django.contrib.gis.geos import Point
from django.utils.timezone import make_aware
import pgeocode

from main.models import Place, Zone

class Command(BaseCommand):

    def update_school(self, limit):
        # NYC API:
        client = Socrata("data.cityofnewyork.us",
                        "EXI398QZgUcSkIww5h9tF5v0u",
                        username="ly.nguyen@ucdconnect.ie",
                        password="mS.sMHVPLQn5*tU")

        # Returned as JSON from API / converted to Python list of dictionaries by sodapy.
        schools = client.get("wg9x-4ke6",limit=limit)
        
        def find_zone(long,lat,nyc_id,small_cate,big_cate,name):
            """Find the taxi_zones that contain a place
            Then create a Place object accordingly"""
            point = Point(float(long),float(lat),srid=4326)
            zone = Zone.objects.filter(geom__bbcontains=point)
            zone_list = list(zone)
            if len(zone_list) > 0:    
                # Create a new object and write to database
                obj = Place(
                    nyc_id = nyc_id, 
                    status = 'Active', 
                    small_cate = small_cate,
                    big_cate = big_cate,
                    name = name,
                    geom = point,
                    taxi_zone = zone_list[0]
                )
                obj.save()
                print(big_cate,nyc_id,'created')
            else:
                print("Cannot find a taxi zone that contains", big_cate, 
                    nyc_id,"at co-ordinate",long,lat)

        # Create/update school object inside Places table
        for place in schools:                
            try:
                obj = Place.objects.get(nyc_id=place['system_code'])
                
                # If exists, update latest status
                if place['status_descriptions']=="Open":
                    obj.status = 'Active'
                else:
                    obj.status = 'Inactive'
                print("School with code", place['system_code'], 'updated')
                obj.save()
            
            except Place.DoesNotExist:
                
                # If not exist, check whether it's active
                if place['status_descriptions']!="Closed":
                    
                    # If active, create a new object
                    long = place['longitude']
                    lat = place['latitude']
                    nyc_id = place['system_code']
                    small_cate = place.get('location_category_description','Others')
                    big_cate = "Education"
                    name = place.get('location_name','A '+small_cate)
                    find_zone(long,lat,nyc_id,small_cate,big_cate,name)

    def add_arguments(self , parser):
        parser.add_argument('limit' , nargs='+' , type=int, 
        help='Specify the limit of data to read from NYC API as an argument. On average, there are fewer than 1000 schools.')

    def handle(self, *args, **kwargs):
        limit = kwargs['limit']
        self.update_school(limit)
        