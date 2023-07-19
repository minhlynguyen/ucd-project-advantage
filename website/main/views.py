from django.http import HttpResponse, JsonResponse
from rest_framework.response import Response

from django.shortcuts import render
from rest_framework import generics
from django.views.generic import TemplateView
from django.core.serializers import serialize
from rest_framework import permissions, status

from . import serializers
from . import models

# Create your views here.
# class AdvertiserList(generics.ListAPIView):
#     queryset = models.Advertiser.objects.all()
#     serializer_class = serializers.AdvertiserSerializer

class SolutionsView(TemplateView):
    template_name = "solutions.html"

def zones(request):
    zones = serialize('geojson',models.Zone.objects.all())
    # return zones
    # return HttpResponse(zones,content_type='json')
    # return Response(zones,status=status.HTTP_200_OK)
    return JsonResponse(zones,status=201,safe=False)

def zones_list(request):
    """
    List all zones
    """
    # if request.method == 'GET':
    #     zones = Snippet.objects.all()
    #     serializer = SnippetSerializer(snippets, many=True)
    #     return JsonResponse(serializer.data, safe=False)

    # elif request.method == 'POST':
    #     data = JSONParser().parse(request)
    #     serializer = SnippetSerializer(data=data)
    #     if serializer.is_valid():
    #         serializer.save()
    #         return JsonResponse(serializer.data, status=201)
    #     return JsonResponse(serializer.errors, status=400)