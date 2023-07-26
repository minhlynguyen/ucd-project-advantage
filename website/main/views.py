from django.http import JsonResponse

from django.shortcuts import render
from django.views.generic import TemplateView
from django.core.serializers import serialize
import datetime
from zoneinfo import ZoneInfo

from .serializers import ZoneDataSerializer
from .models import Zone, Place, ZoneDetail


# Create your views here.
# class AdvertiserList(generics.ListAPIView):
#     queryset = models.Advertiser.objects.all()
#     serializer_class = serializers.AdvertiserSerializer

class SolutionsView(TemplateView):
    template_name = "solutions.html"

def zones(request):
    """
    List all zones in form of JsonResponse with Status code 1=DB success, 2=DB fail
    """
    try: 
        zones = serialize('geojson',Zone.objects.all().order_by('-current_impression'))
    except Exception as e:
        return JsonResponse({"status":"2","data":str(e)},status=201)
    return JsonResponse({"status":"1","data":zones},status=201,safe=False)

def place_in_zone(request, id):
    """
    Retrieve all places of a zone
    """
    try:
        places = serialize('geojson',Place.objects.filter(taxi_zone_id=id,status="Active"))
    except Exception as e:
        return JsonResponse({"status":"2","data":str(e)},status=201)

    if request.method == 'GET':
        return JsonResponse({"status":"1","data":places},status=201,safe=False)


def zone_data(request):
    """
    Retrieve history detail of a zone
    """
    # Use this when data is updated
    # now=datetime.datetime.now(tz=ZoneInfo("America/New_York"))
    # year, month, day= now.strftime("%Y"), now.strftime("%m"), now.strftime("%d")

    # This is for testing
    year, month, day = 2023, 4, 30
    
    try:
        zone = ZoneDetail.objects.filter(datetime__date=datetime.date(year, month, day)).order_by("taxi_zone_id")
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