from django.http import JsonResponse

from django.shortcuts import render
from django.views.generic import TemplateView
from django.core.serializers import serialize
from django.contrib.auth.decorators import login_required
import datetime
from zoneinfo import ZoneInfo

from .serializers import ZoneDataSerializer, zone_census_serializer
from .models import Place, ZoneDetail, ZonePuma
from rest_framework.permissions import DjangoModelPermissions
from rest_framework import generics

# @login_required
def zone_census(request):
    """
    List all zones with its census data. Status code 1=DB success, 2=DB fail
    """
    try: 
        census = zone_census_serializer()
    except Exception as e:
        return JsonResponse({"status":"2","data":str(e)},status=201)
    
    if request.method == 'GET':
        return JsonResponse({"status":"1","data":census},status=201,safe=False)

# @login_required
def place_in_zone(request, id):
    """
    Retrieve all places of a zone. Status code 1=DB success, 2=DB fail
    """
    try:
        places = serialize('geojson',Place.objects.filter(taxi_zone_id=id,status="Active"))
    except Exception as e:
        return JsonResponse({"status":"2","data":str(e)},status=201)

    if request.method == 'GET':
        return JsonResponse({"status":"1","data":places},status=201,safe=False)

# @login_required
def zone_data(request):
    """
    Retrieve history detail of a zone
    """
    # Use this when data is updated
    now=datetime.datetime.now(tz=ZoneInfo("America/New_York"))
    year, month, day= now.strftime("%Y"), now.strftime("%m"), now.strftime("%d")

    # This is for testing
    # year, month, day = 2023, 4, 30
    
    try:
        zone = ZoneDetail.objects.filter(datetime__date=datetime.date(int(year), int(month), int(day))).order_by("taxi_zone_id","datetime")
    except Exception as e:
        return JsonResponse({"status":"2","data":str(e)},status=201)

    if request.method == 'GET':
        # Use lambda function to modify the structure of the data dictionary
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
        return JsonResponse({"status":"1","data":data},status=201)

# @login_required
def zone_detail(request, id):
    """
    Retrieve history detail of a zone
    """
    try:
        zone = ZoneDetail.objects.filter(taxi_zone_id=id).order_by('datetime')
        if len(zone)==0:
            return JsonResponse({"status":"2","data":"Zone does not exist"},status=201)
    except Exception as e:
        return JsonResponse({"status":"2","data":str(e)},status=201)

    if request.method == 'GET':
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
        return JsonResponse({"status":"1","data":data},status=201)

