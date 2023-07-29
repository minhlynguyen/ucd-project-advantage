from django.core.management.base import BaseCommand
from sodapy import Socrata
from datetime import datetime
from django.contrib.gis.geos import Point
from django.utils import timezone
from django.utils.timezone import make_aware
import pgeocode

from main.models import Place, Zone

class Command(BaseCommand):

    def connect_api(self,code,limit):
        """Code for the services on NYC data
        Limit is the maximum calls from the service"""
        client = Socrata("data.cityofnewyork.us",
                        "EXI398QZgUcSkIww5h9tF5v0u",
                        username="ly.nguyen@ucdconnect.ie",
                        password="mS.sMHVPLQn5*tU")
        data = client.get(code, limit=limit)
        return data

    def find_zone(self,long,lat,nyc_id,small_cate,big_cate,name):
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
    
    def geolocate(self, zip):
            """Turn ZIP code to longitude and latitude"""
            nomi = pgeocode.Nominatim('us')
            location = nomi.query_postal_code(zip)
            return location.longitude, location.latitude

    def update_business(self, limit):
        businesses = self.connect_api("w7w3-xahh", limit=limit)

        # Create/update business object inside Places table
        for business in businesses:
            try:
                # Filter valid business
                if datetime.strptime(business.get('lic_expir_dd','2024-01-01T00:00:00.000'), '%Y-%m-%dT%H:%M:%S.%f') <= datetime.strptime('2022-01-01', '%Y-%m-%d'):
                    print("Business is closed before 2022")
                elif (business.get('address_borough', 'Not provided') == "Outside NYC" or 
                    int(business['address_zip']) < 10001 or int(business['address_zip']) > 11697
                ):
                    print("Business is outside New York City")
                elif business.get('address_state', 'Not provided') != "NY":
                    print("Business is outside New York State")
                else:                    
                    # Find big industry
                    small_industry = business.get('industry','Others')
                    big_industry = ''
                    if business['license_status']=='Active':
                        if small_industry in ('Catering Establishment','Sidewalk Cafe','Third Party Food Delivery'):
                            big_industry = 'Food and Beverage'
                            # food_and_beverage += food_and_beverage

                        elif small_industry in ('Gaming Cafe','Amusement Arcade','Cabaret','Bingo Game Operator',
                                                        'Amusement Device Permanent','Amusement Device Portable',
                                                        'Amusement Device Temporary','Games of Chance',
                                                        'Sightseeing Bus','Sightseeing Guide','Pool or Billiard Room'):
                            big_industry = 'Entertainment and Recreation'
                            # entertainment_and_recreation += entertainment_and_recreation

                        elif small_industry in ('Car Wash','Booting Company','Garage','Garage and Parking Lot','Parking Lot',
                                                        'Secondhand Dealer - Auto','Tow Truck Company','Tow Truck Exemption',
                                                        'Tow Truck Driver'):
                            big_industry = 'Parking and Automotive Services'
                            # parking_and_automotive_services += parking_and_automotive_services

                        elif small_industry in ('Employment Agency','Electronic & Appliance Service','General Vendor Distributor',
                                                        'Process Serving Agency','Scale Dealer Repairer','Scrap Metal Processor',
                                                        'General Vendor','Process Server Individual'):
                            big_industry = 'Professional Services'
                            # professional_services += professional_services

                        elif small_industry in ('Laundry','Laundries','Laundry Jobber','General Vendor Distributor',
                                                        'Newsstand','Electronics Store','Electronic Cigarette Dealer',
                                                        'Dealer In Products','Secondhand Dealer - Firearms',
                                                        'Secondhand Dealer - General','Tobacco Retail Dealer',
                                                        'Ticket Seller Business','Stoop Line Stand','Special Sale','Ticket Seller'):
                            big_industry = 'Retail Services'
                            # retail_services += retail_services

                        elif small_industry in ('Debt Collection Agency','Pawnbroker'):
                            big_industry = 'Financial Services'
                            # financial_services += financial_services

                        elif small_industry in ('Construction Labor Provider','Home Improvement Contractor','Commercial Lessor',
                                                        'Auction House Premises','Storage Warehouse','Locksmith','Locksmith Apprentice'):
                            big_industry = 'Real Estate'
                            # real_estate += real_estate

                        elif small_industry in ('Horse Drawn Cab Owner','Pedicab Business','Pedicab Driver','Horse Drawn Driver'):
                            big_industry = 'Transportation'
                            # transportation += transportation

                        else:
                            big_industry = 'Others'
                            # others += others

                    # Check if a record in already in database
                    try:
                        obj = Place.objects.get(nyc_id=business['license_nbr'])
                        # If exists, update latest status
                        obj.status = business['license_status']
                        obj.last_update = timezone.now()
                        obj.save()
                        print("Business license", business['license_nbr'],'updated')
                    
                    except Place.DoesNotExist:
                        # If not exist, check whether it's active
                        if business['license_status']=='Active':

                            # Convert ZIP code to coordinates
                            if business.get('longitude', 'Not provided') == 'Not provided':
                                long, lat = self.geolocate(business.get('address_zip'))
                                business['longitude'] = long
                                business['latitude'] = lat
                                # print("Zip code", business['address_zip'], "converted to", long, lat, "for Business license", business['license_nbr'])
                            
                            # Find the taxi zones that contains the place
                            long = business['longitude']
                            lat = business['latitude']
                            nyc_id = business['license_nbr']
                            name = business.get('business_name', 'A business in'+small_industry+' industry')
                            self.find_zone(long,lat,nyc_id,small_industry,big_industry,name)
                        
                        else: 
                            print("Business is not Active")

            except Exception as e:
                print(e)

    def update_hospital(self, limit):

        hospitals = self.connect_api("833h-xwsx", limit=limit)
            
        for place in hospitals:
            
            try:
                # If exist, print a message
                obj = Place.objects.get(nyc_id=place['phone'])
                obj.last_update = timezone.now()
                print("Hospital with phone number", obj.nyc_id, 'existed')
            
            except Place.DoesNotExist:

                # If not exist, create a new object
                long = place['location_1']['longitude']
                lat = place['location_1']['latitude']
                nyc_id = place['phone']
                small_cate = place.get('facility_type','Others')
                big_cate = "Health Care",
                name = place.get('facility_name','A '+small_cate),
                self.find_zone(long,lat,nyc_id,small_cate,big_cate,name)

    def update_school(self, limit):

        schools = self.connect_api("wg9x-4ke6", limit=limit)
        for place in schools:                
            try:
                obj = Place.objects.get(nyc_id=place['system_code'])
                
                # If exists, update latest status
                if place['status_descriptions']=="Open":
                    obj.status = 'Active'
                else:
                    obj.status = 'Inactive'
                obj.last_update = timezone.now()
                obj.save()
                print("School with code", place['system_code'], 'updated')
            
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
                    self.find_zone(long,lat,nyc_id,small_cate,big_cate,name)
    
    def update_wifi(self, limit):
        
        hotspots = self.connect_api("yjub-udmw",limit=limit)
        
        # Create/update wifi hotspot object inside Places table
        for place in hotspots:            
            
            try:
                # Check whether the hotspot is already in database
                obj = Place.objects.get(nyc_id=place['objectid'])
                obj.last_update = timezone.now()
                print("Wifi hotspot with code", obj.nyc_id, 'existed')

            except Place.DoesNotExist: 

                # Find the taxi zones that contains the place
                long = place['longitude']
                lat = place['latitude']
                nyc_id = place['objectid']
                small_cate = place.get('type','Other')
                big_cate = "Wifi hotspot"
                name = place.get('name','A '+small_cate+' Wifi Hotspot')
                self.find_zone(long,lat,nyc_id,small_cate,big_cate,name)

    def add_arguments(self , parser):
        parser.add_argument('limit' , nargs='+' , type=int, 
        help='Specify the limit of data to read from NYC API as an argument. On average, there are fewer than 300K businesses.',
        default=300000)

    def handle(self, *args, **kwargs):
        limit = kwargs['limit']
        self.update_business(limit)
        self.update_hospital(limit)
        self.update_school(limit)
        self.update_wifi(limit)
        