from django.http import HttpResponse, JsonResponse
from rest_framework.response import Response

from django.shortcuts import render
from rest_framework import generics
from django.views.generic import TemplateView
from django.core.serializers import serialize
from rest_framework import permissions, status
from rest_framework.parsers import JSONParser

from .serializers import ZoneSerializer
from .models import Zone


# Create your views here.
# class AdvertiserList(generics.ListAPIView):
#     queryset = models.Advertiser.objects.all()
#     serializer_class = serializers.AdvertiserSerializer

class SolutionsView(TemplateView):
    template_name = "solutions.html"

def zones(request):
    zones = serialize('geojson',Zone.objects.all())
    # return zones
    return HttpResponse(zones,content_type='json')
    # return Response(zones,status=status.HTTP_200_OK)
    # return JsonResponse(zones,status=201,safe=False)

def zone_list(request):
    """
    List all zones
    """
    try:
        zones = Zone.objects.all()
    except Exception as e:
        # return HttpResponse(status=404)
        return JsonResponse({"status":"2","data":str(e)},status=201)
    
    if request.method == 'GET':
        serializer = ZoneSerializer(zones, many=True)
        return JsonResponse({"status":"1","data":serializer.data}, status=201, safe=False)

    # elif request.method == 'POST':
    #     data = JSONParser().parse(request)
    #     serializer = ZoneSerializer(data=data)
    #     if serializer.is_valid():
    #         serializer.save()
    #         return JsonResponse(serializer.data, status=201)
    #     return JsonResponse(serializer.errors, status=400)

def zone_detail(request, pk):
    """
    Retrieve detail of a zone
    """
    try:
        zone = Zone.objects.get(pk=pk)
    except Exception as e:
        # return HttpResponse(status=404)
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