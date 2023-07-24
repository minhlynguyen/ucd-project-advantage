from main.models import Zone, Puma
from main.serializers import ZoneSerializer
from django.core.serializers import serialize
from geopy.geocoders import Nominatim
from geopy.extra.rate_limiter import RateLimiter
# import shapely.geometry
from sodapy import Socrata

# point1 = shapely.geometry.Point(24.952242, 60.1696017)
# point2 = shapely.geometry.Point(24.976567, 60.1612500)

from django.contrib.gis.geos import Point
from django.contrib.gis.db.models.functions import Intersection
from django.contrib.gis.measure import Area
point3 = Point(12.4604, 43.9420)

zones = Zone.objects.get(id=44)
pumas = Puma.objects.get(id=3901)
# zones_list = list(zones)
# pumas_list = list(pumas)

# zones = serialize('list',Zone.objects.all())
# serializer = ZoneSerializer(zones, many=True)
# polygon1 = zones_list[0].geom
# polygon2 = pumas_list[0].geom
polygon1 = zones.geom
# .transform(srid, clone=False)
polygon2 = pumas.geom


print(point3.within(polygon1))

intersects=polygon1.intersection(polygon2)
print(intersects.area)

# Get detail of active businesses from NYC API
client = Socrata("data.cityofnewyork.us",
                    "EXI398QZgUcSkIww5h9tF5v0u",
                    username="ly.nguyen@ucdconnect.ie",
                    password="mS.sMHVPLQn5*tU")

# Returned as JSON from API / converted to Python list of dictionaries by sodapy.
results = client.get("w7w3-xahh", limit=100)
    # self.stdout.write(results)
    
active_business = []
for business in results:
    try:
        if (business.get('address_borough', 'Not provided') != "Outside NYC" 
            and business.get('address_state', 'Not provided')=="NY"
            and int(business['address_zip']) >= 10001
            and int(business['address_zip']) <= 11697
            and business['license_status']=='Active'):
                active_business.append(business)
                print("Business license", business['license_nbr'],'added')
    except Exception as e:
        print(e)

# Define what business is in the zones
active_business_in_zone = []

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
    
    # Define the taxi zones the business are located in the query zones
    print(type(business['longitude']))
    location = Point(float(business['longitude']),float(business['latitude']))
    if(location.within(polygon1)):
        active_business_in_zone.append(business)
        print(business['license_nbr'],"is in",zones)

print(active_business_in_zone[1])

