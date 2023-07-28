from django.core.management.base import BaseCommand
from sodapy import Socrata
from datetime import datetime
from django.contrib.gis.geos import Point
from django.utils.timezone import make_aware
import pgeocode

from main.models import Place, Zone

class Command(BaseCommand):

    def update_hospital(self, limit):
        # NYC API:
        client = Socrata("data.cityofnewyork.us",
                        "EXI398QZgUcSkIww5h9tF5v0u",
                        username="ly.nguyen@ucdconnect.ie",
                        password="mS.sMHVPLQn5*tU")

        # Returned as JSON from API / converted to Python list of dictionaries by sodapy.
        hospitals = client.get("833h-xwsx",limit=limit)
        
        def find_zone(long,lat,nyc_id,small_cate,big_cate,name):
            """Find the taxi_zones that contain a place
            Then create a Place object accordingly"""
            point = Point(float(long),float(lat),srid=4326)
            zone = Zone.objects.filter(geom__contains_properly=point)
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

        # Create/update hospital object inside Places table
        for place in hospitals:
            
            try:
                # If exist, print a message
                obj = Place.objects.get(nyc_id=place['phone'])
                print("Hospital with phone number", obj.nyc_id, 'existed')
            
            except Place.DoesNotExist:

                # If not exist, create a new object
                long = place['location_1']['longitude']
                lat = place['location_1']['latitude']
                nyc_id = place['phone']
                small_cate = place.get('facility_type','Others')
                big_cate = "Health Care",
                name = place.get('facility_name','A '+small_cate),
                find_zone(long,lat,nyc_id,small_cate,big_cate,name)


    def add_arguments(self , parser):
        parser.add_argument('limit' , nargs='+' , type=int, 
        help=('Specify the limit of data to read from NYC API as an argument. On average, there are fewer than 100 hospitals.'))

    def handle(self, *args, **kwargs):
        limit = kwargs['limit']
        self.update_hospital(limit)
        