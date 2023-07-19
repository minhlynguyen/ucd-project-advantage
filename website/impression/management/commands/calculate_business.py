from django.core.management.base import BaseCommand
from sodapy import Socrata
from datetime import datetime

class Command(BaseCommand):

    def handle(self, *args, **kwargs):

        help = 'Reading Business API'
        
        # Example authenticated client (needed for non-public datasets):
        client = Socrata("data.cityofnewyork.us",
                        "EXI398QZgUcSkIww5h9tF5v0u",
                        username="ly.nguyen@ucdconnect.ie",
                        password="mS.sMHVPLQn5*tU")

        # Returned as JSON from API / converted to Python list of dictionaries by sodapy.
        results = client.get("w7w3-xahh", limit=1000)
        # self.stdout.write(results)
        
        valid_business = []
        for business in results:
            try:
                if datetime.strptime(business['lic_expir_dd'], '%Y-%m-%dT%H:%M:%S.%f') > datetime.strptime('2022-01-01', '%Y-%m-%d'):
                    print(business)
                    valid_business.append(business)
            except Exception as e:
                print(e)

        print(len(valid_business))