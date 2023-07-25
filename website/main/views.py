from django.http import JsonResponse

from django.shortcuts import render
from django.views.generic import TemplateView
from django.core.serializers import serialize
import datetime
from zoneinfo import ZoneInfo

from .serializers import ZoneSerializer, ZoneDataSerializer
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

def zone_detail(request, pk):
    """
    Retrieve detail of a zone
    """
    try:
        zone = Zone.objects.get(pk=pk)
    except Exception as e:
        return JsonResponse({"status":"2","data":str(e)},status=201)

    if request.method == 'GET':
        serializer = ZoneSerializer(zone)
        return JsonResponse({"status":"1","data":serializer.data},status=201)

    # elif request.method == 'PUT':
    #     data = JSONParser().parse(request)
    #     serializer = ZoneSerializer(zone, data=data)
    #     if serializer.is_valid():
    #         serializer.save()
    #         return JsonResponse(serializer.data)
    #     return JsonResponse(serializer.errors, status=400)

def place_in_zone(request, id):
    """
    Retrieve all places of a zone
    """
    try:
        places = serialize('geojson',Place.objects.filter(taxi_zone_id=id,status="Active"))
        # place = Place.objects.filter(taxi_zone_id=id,status="Active")
    except Exception as e:
        return JsonResponse({"status":"2","data":str(e)},status=201)

    if request.method == 'GET':
        return JsonResponse({"status":"1","data":places},status=201,safe=False)
        # serializer = PlaceSerializer(place, many=True)
        # return JsonResponse({"status":"1","data":serializer.data},status=201)

def zone_data(request):
    # Use this when data is updated
    now=datetime.datetime.now(tz=ZoneInfo("America/New_York"))
    year, month, day= now.strftime("%Y"), now.strftime("%m"), now.strftime("%d")

    # This is for testing
    year, month, day = 2023, 4, 30
    
    try:
        zone = ZoneDetail.objects.filter(datetime__date=datetime.date(year, month, day))
    except Exception as e:
        return JsonResponse({"status":"2","data":str(e)},status=201)

    if request.method == 'GET':
        serializer = ZoneDataSerializer(zone,many=True)
        return JsonResponse({"status":"1","data":serializer.data},status=201)