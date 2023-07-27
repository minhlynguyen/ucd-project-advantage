from django.core.management.base import BaseCommand
from sodapy import Socrata
from datetime import datetime
from django.contrib.gis.geos import Point
from django.utils.timezone import make_aware
import pgeocode

from main.models import Place, Zone

class Command(BaseCommand):

    def update_business(self, limit):
        # NYC API:
        client = Socrata("data.cityofnewyork.us",
                        "EXI398QZgUcSkIww5h9tF5v0u",
                        username="ly.nguyen@ucdconnect.ie",
                        password="mS.sMHVPLQn5*tU")

        # Returned as JSON from API / converted to Python list of dictionaries by sodapy.
        businesses = client.get("w7w3-xahh", limit=limit)

        # Process the data before writing to DB
        nomi = pgeocode.Nominatim('us')
        def geolocate(zip):
            """Turn ZIP code to longitude and latitude"""
            location = nomi.query_postal_code(zip)
            return location.longitude, location.latitude
        
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
                        obj.save()
                        print("Business license", business['license_nbr'],'updated')
                    except Place.DoesNotExist:
                        # If not exist, check whether it's active
                        if business['license_status']=='Active':

                            # Convert ZIP code to coordinates
                            if business.get('longitude', 'Not provided') == 'Not provided':
                                long, lat =  geolocate(business.get('address_zip'))
                                business['longitude'] = long
                                business['latitude'] = lat
                                # print("Zip code", business['address_zip'], "converted to", long, lat, "for Business license", business['license_nbr'])
                            
                            # Find the taxi zones that contains the place
                            long = business['longitude']
                            lat = business['latitude']
                            nyc_id = business['license_nbr']
                            name = business.get('business_name', 'A business in'+small_industry+' industry')
                            find_zone(long,lat,nyc_id,small_industry,big_industry,name)
                        
                        else: 
                            print("Business is not Active")

            except Exception as e:
                print(e)

    def add_arguments(self , parser):
        parser.add_argument('limit' , nargs='+' , type=int, 
        help='Reading Business API')

    def handle(self, *args, **kwargs):
        limit = kwargs['limit']
        self.update_business(limit)
        