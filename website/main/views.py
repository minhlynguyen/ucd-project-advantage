from django.http import HttpResponse
from django.shortcuts import render
from rest_framework import generics
from django.views.generic import TemplateView
from django.core.serializers import serialize

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
    return HttpResponse(zones,content_type='json')
