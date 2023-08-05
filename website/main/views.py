from django.utils import timezone
from django.http import JsonResponse
from django.core.serializers import serialize
import datetime
from .serializers import ZoneDataSerializer, zone_census_serializer, today_info
from .models import Place, ZoneDetail
from rest_framework.permissions import DjangoModelPermissions
from rest_framework import response
from rest_framework.decorators import api_view, schema, permission_classes
from rest_framework.permissions import IsAuthenticated
from django.db.models import Sum


@api_view(['GET'])
@permission_classes([IsAuthenticated])
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
@permission_classes([IsAuthenticated])
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
@permission_classes([IsAuthenticated])
def zone_hourly(request, id=None):
    """
    Retrieve hourly total impression in all zones if no ID is provided or 1 zone if ID is provided
    """
    start_time = request.query_params.get('start_time')
    end_time = request.query_params.get('end_time')
    id = request.query_params.get('zone_id')
    zone = None

    if id == None:
        try:
            zone = ZoneDetail.objects.filter(datetime__range=(start_time, end_time))
            if len(zone)==0:
                pass
            data_list = zone.values('taxi_zone_id').annotate(impression=Sum('impression_predict'))
            data_dict = {item["taxi_zone_id"]: item["impression"] for item in data_list}

            return response.Response({"status":"1","data":data_dict})
        except Exception as e:
            return response.Response({"status":"2","data":str(e)})
    else:
        try:
            zone = ZoneDetail.objects.filter(taxi_zone_id=id)     
            if len(zone)==0:
                return response.Response({"status":"2","data":"Zone does not exist"})
            else: 
                zone = zone.filter(datetime__range=(start_time, end_time)).order_by('datetime')
                if len(zone)==0:
                    pass
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

        except Exception as e:
            return response.Response({"status":"2","data":str(e)})

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def all_zones_today(request, id=None):
    """
    Retrieve history detail of all zone in 24 hour
    """
    try:
        data = today_info(id)
        return response.Response({"status":"1","data":data})
    except Exception as e:
        return response.Response({"status":"2","data":str(e)})