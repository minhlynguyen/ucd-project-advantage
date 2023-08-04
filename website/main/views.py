from django.utils import timezone
from django.core.serializers import serialize
import datetime
from .serializers import ZoneDataSerializer, zone_census_serializer
from .models import Place, ZoneDetail
from rest_framework.permissions import DjangoModelPermissions
from rest_framework import response
from rest_framework.decorators import api_view, schema, permission_classes

@api_view(['GET'])
def zone_census(request, id=None):
    """
    List all zones with its census data. Status code 1=DB success, 2=DB fail
    """
    try: 
        census = zone_census_serializer(id)
    except Exception as e:
        return response.Response({"status":"2","data":str(e)})    
    return response.Response({"status":"1","data":census})

@api_view(['GET'])
def place_in_zone(request, id):
    """
    Retrieve all places of a zone. Status code 1=DB success, 2=DB fail
    """
    try:
        places = serialize('geojson',Place.objects.filter(taxi_zone_id=id,status="Active"))
    except Exception as e:
        return response.Response({"status":"2","data":str(e)})
    return response.Response({"status":"1","data":places})

@api_view(['GET'])
def zone_hourly(request, id):
    """
    Retrieve hourly detail of a zone
    """
    try:
        zone = ZoneDetail.objects.filter(taxi_zone_id=id).order_by('datetime')
        if len(zone)==0:
            return response.Response({"status":"2","data":"Zone does not exist"})
    except Exception as e:
        return response.Response({"status":"2","data":str(e)})

    serializer = ZoneDataSerializer(zone,many=True)
    data = serializer.data
    data = {
        item["taxi_zone_id"]: {
            "detail": [
                {
                    k: v
                    for k, v in entry.items()
                    if k != "taxi_zone_id"
                }
            for entry in data
            if entry["taxi_zone_id"] == item["taxi_zone_id"]
            ]
        }
        for item in data
    }
    return response.Response({"status":"1","data":data})

@api_view(['GET'])
def all_zones_today(request):
    """
    Retrieve history detail of all zone in 24 hour
    """
    try:
        now=timezone.now()
        year, month, day= now.strftime("%Y"), now.strftime("%m"), now.strftime("%d")
        zone = ZoneDetail.objects.filter(datetime__date=datetime.date(int(year), int(month), int(day))).order_by("taxi_zone_id","datetime")
    except Exception as e:
        return response.Response({"status":"2","data":str(e)})

    serializer = ZoneDataSerializer(zone,many=True)
    data = serializer.data
    data = {
        item["taxi_zone_id"]: {
            "detail": [
                {
                    k: v
                    for k, v in entry.items()
                    if k != "taxi_zone_id"
                }
            for entry in data
            if entry["taxi_zone_id"] == item["taxi_zone_id"]
            ]
        }
        for item in data
    }
    return response.Response({"status":"1","data":data})