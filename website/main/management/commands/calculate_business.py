# This script is to update the active businesses
# Frequency is Every day
# https://stackoverflow.com/questions/1601153/django-custom-command-and-cron
# https://medium.com/@bencleary/django-schedule-tasks-664649be2dea

from django.core.management.base import BaseCommand
from sodapy import Socrata
from datetime import datetime
from geopy.geocoders import Nominatim
from geopy.extra.rate_limiter import RateLimiter
from django.contrib.gis.geos import Point

from main.models import Business

class Command(BaseCommand):
    
    def handle(self, *args, **kwargs):

        help = 'Reading Business API'
        
        # NYC API:
        client = Socrata("data.cityofnewyork.us",
                        "EXI398QZgUcSkIww5h9tF5v0u",
                        username="ly.nguyen@ucdconnect.ie",
                        password="mS.sMHVPLQn5*tU")

        # Returned as JSON from API / converted to Python list of dictionaries by sodapy.
        businesses = client.get("w7w3-xahh", limit=100)
        
        geolocator = Nominatim(user_agent="geoapiExercises")
        geocode_with_delay = RateLimiter(geolocator.geocode,min_delay_seconds=1)
        def geolocate(zip):
            """Turn ZIP code to longitude and latitude"""
            location = geocode_with_delay(zip)
            return location.longitude, location.latitude

        # valid_business = []
        for business in businesses:
            try:
                # Filter valid business
                if (datetime.strptime(business['lic_expir_dd'], '%Y-%m-%dT%H:%M:%S.%f') > datetime.strptime('2022-01-01', '%Y-%m-%d') 
                    and business.get('address_borough', 'Not provided') != "Outside NYC" 
                    and business.get('address_state', 'Not provided')=="NY"
                    and int(business['address_zip']) >= 10001
                    and int(business['address_zip']) <= 11697
                    and business['license_status']=='Active'):
                    
                    # Convert zip code to long, lat
                    if business.get('longitude', 'Not provided') == 'Not provided':
                        long, lat =  geolocate(business.get('address_zip'))
                        business['longitude'] = long
                        business['latitude'] = lat
                        print("Zip code converted for Business license", business['license_nbr'])
                    print("Co-ordinates are already provided for Business license", business['license_nbr'])

                    # Find big industry
                    big_industry = ''
                    if business.get('industry','Others') in ('Catering Establishment','Sidewalk Cafe','Third Party Food Delivery'):
                        big_industry = 'Food and Beverage'
                    elif business.get('industry','Others') in ('Gaming Cafe','Amusement Arcade','Cabaret','Bingo Game Operator',
                                                  'Amusement Device Permanent','Amusement Device Portable',
                                                  'Amusement Device Temporary','Games of Chance',
                                                  'Sightseeing Bus','Sightseeing Guide','Pool or Billiard Room'):
                        big_industry = 'Entertainment and Recreation'
                    elif business.get('industry',) in ('Car Wash','Booting Company','Garage','Garage and Parking Lot','Parking Lot',
                                                    'Secondhand Dealer - Auto','Tow Truck Company','Tow Truck Exemption',
                                                    'Tow Truck Driver'):
                        big_industry = 'Parking and Automotive Services'
                    elif business.get('industry') in ('Employment Agency','Electronic & Appliance Service','General Vendor Distributor',
                                                  'Process Serving Agency','Scale Dealer Repairer','Scrap Metal Processor',
                                                  'General Vendor','Process Server Individual'):
                        big_industry = 'Professional Services'
                    elif business.get('industry') in ('Laundry','Laundries','Laundry Jobber','General Vendor Distributor',
                                                  'Newsstand','Electronics Store','Electronic Cigarette Dealer',
                                                  'Dealer In Products','Secondhand Dealer - Firearms',
                                                  'Secondhand Dealer - General','Tobacco Retail Dealer',
                                                  'Ticket Seller Business','Stoop Line Stand','Special Sale','Ticket Seller'):
                        big_industry = 'Retail Services'
                    elif business.get('industry') in ('Debt Collection Agency','Pawnbroker'):
                        big_industry = 'Financial Services'
                    elif business.get('industry') in ('Construction Labor Provider','Home Improvement Contractor','Commercial Lessor',
                                                  'Auction House Premises','Storage Warehouse','Locksmith','Locksmith Apprentice'):
                        big_industry = 'Real Estate'
                    elif business.get('industry') in ('Horse Drawn Cab Owner','Pedicab Business','Pedicab Driver','Horse Drawn Driver'):
                        big_industry = 'Transportation'
                    else:
                        big_industry = 'Others'

                    # Create record in database
                    business_record = Business.objects.create(
                        licence_nbr = business['license_nbr'],
                        lic_expir_dd = datetime.strptime(business['lic_expir_dd'], '%Y-%m-%dT%H:%M:%S'),
                        license_status = business['license_status'],
                        license_creation_date = datetime.strptime(business['license_creation_date'], '%Y-%m-%dT%H:%M:%S'),
                        industry = business.get('industry'),
                        big_industry = big_industry,
                        business_name = business['business_name'],
                        address_building = business.get('address_building'),
                        address_street_name = business.get('address_street_name'),
                        address_zip = business.get('address_zip'),
                        contact_phone = business['contact_phone'],
                        longitude = float(business['longitude']),
                        latitude = float(business['latitude']),
                        # taxi_zone = models.ForeignKey(Zone,related_name='zone_places',on_delete=models.RESTRICT)
                        geom = Point(float(business['longitude']),float(business['latitude']),srid=4326)
                    )                  
                    business_record.save()
                    print("Business license", business['license_nbr'],'created')
            except Exception as e:
                print(e)