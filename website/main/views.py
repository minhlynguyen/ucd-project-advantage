# from django.shortcuts import render
from rest_framework import generics
from . import serializers
from . import models

# Create your views here.
class AdvertiserList(generics.ListAPIView):
    queryset = models.Advertiser.objects.all()
    serializer_class = serializers.AdvertiserSerializer