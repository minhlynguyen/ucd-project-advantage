from django.core.management.base import BaseCommand
from sodapy import Socrata
from datetime import datetime
from geopy.geocoders import Nominatim
from geopy.extra.rate_limiter import RateLimiter

class Command(BaseCommand):

    def handle(self, *args, **kwargs):

        help = 'Reading Business API'
        
        # Example authenticated client (needed for non-public datasets):
        client = Socrata("data.cityofnewyork.us",
                        "EXI398QZgUcSkIww5h9tF5v0u",
                        username="ly.nguyen@ucdconnect.ie",
                        password="mS.sMHVPLQn5*tU")

        # Returned as JSON from API / converted to Python list of dictionaries by sodapy.
        results = client.get("w7w3-xahh", limit=100)
        # self.stdout.write(results)
        
        valid_business = []
        for business in results:
            try:
                if (datetime.strptime(business['lic_expir_dd'], '%Y-%m-%dT%H:%M:%S.%f') > datetime.strptime('2022-01-01', '%Y-%m-%d') 
                    and business.get('address_borough', 'Not provided') != "Outside NYC" 
                    and business.get('address_state', 'Not provided')=="NY"
                    and int(business['address_zip']) >= 10001
                    and int(business['address_zip']) <= 11697):
                    valid_business.append(business)
                    print("Business license", business['license_nbr'],'added')
            except Exception as e:
                print(e)

        print((valid_business[0]))

        # Adding active business to current and future database

        active_business = []

        for business in valid_business:
            try: 
                if business['license_status']=='Active':
                    active_business.append(business)
                    print("Business license", business['license_nbr'],'is Active')
            except Exception as e:
                print(e)
        
        geolocator = Nominatim(user_agent="geoapiExercises")
        geocode_with_delay = RateLimiter(geolocator.geocode,min_delay_seconds=1)

        def geolocate(zip):
            location = geocode_with_delay(zip)
            return location.longitude, location.latitude

        for business in active_business:

            # Calculate the co-ordinates for the business
            if business.get('longitude', 'Not provided') == 'Not provided':
                long, lat =  geolocate(business.get('address_zip'))
                business['longitude'] = long
                business['latitude'] = lat
                print("Zip code converted for Business license", business['license_nbr'])
            else:
                print("Co-ordinates are already provided for Business license", business['license_nbr'])
            
            # Define the taxi zones the business are located in
            



        # print((active_business[0]))
