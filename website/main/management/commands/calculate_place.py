from django.utils import timezone
import datetime
from main.models import Zone, ZoneDetail
from django.contrib.gis.geos import Point 
from zoneinfo import ZoneInfo
from main.serializers import ZoneDataSerializer


from django.core.management.base import BaseCommand

class Command(BaseCommand):

    def handle(self, *args, **kwargs):

        help = 'Aggregate the number of places for zone_detail'

        # Use this when data is updated
        now=datetime.datetime.now(tz=ZoneInfo("America/New_York"))
        year, month, day= now.strftime("%Y"), now.strftime("%m"), now.strftime("%d")

        # This is for testing
        year, month, day = 2023, 4, 30

        # today = datetime.date(year, month, day)
        zones = Zone.objects.all()
        zones = list(zones)
        print(type(zones))
        print(type(zones[0].id))
        zonedetail = ZoneDetail.objects.filter(
                                        #  datetime__exact=datetime.strptime("2023-04-30T23:00:00-0400", "%Y-%m-%dT%H:%M:%S%z")
                                        datetime__date=datetime.date(year, month, day),
                                        taxi_zone__in=zones
                                         ).order_by('datetime').distinct()#
        print(zonedetail[0])
        
        # zones = list(zones)
        # zone_list_detail = []
        # for zone in zones:
        #     detail = {"datetime": zone.datetime,
        #      "impression": zone.impression_history,
        #      "entertainment_and_recreation": zone.entertainment_and_recreation,

        #      }
        #     zone_dict = {"id":zone.taxi_zone_id,"detail":detail}
        #     zone_list_detail.append(zone_dict)
        #     break
        # print(zone_list_detail)
        
        # serializer = ZoneDataSerializer(zones,many=True)

        # print (serializer)
        # for data in serializer:
        #     print (data)
        #     break




    
        # Rating.objects.values('location_id').filter(attribute__in=attributes).annotate(sum_score=Sum('score')).order_by('-score')
        # https://stackoverflow.com/questions/13403609/how-to-group-by-and-aggregate-with-django