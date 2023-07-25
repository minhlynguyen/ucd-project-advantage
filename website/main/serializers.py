from rest_framework import serializers
from .models import ZoneDetail, Place
# from impression.models import Impression
from django.core.serializers import serialize
from rest_framework_gis import serializers as geoserializers

# # class AdvertiserSerializer(serializers.ModelSerializer):
# #     class Meta:
# #         model=models.Advertiser
# #         fields=['user','address']

class PlaceSerializer(geoserializers.GeoFeatureModelSerializer):
# class PlaceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Place
        fields = ['id','big_cate','name','geom','taxi_zone']
        geo_field = 'geom'

class ZoneDataSerializer(serializers.ModelSerializer):

    class Meta:
        model = ZoneDetail
        fields = ['taxi_zone_id','datetime','impression_history', 'entertainment_and_recreation',
                  'financial_services', 'food_and_beverage', 'parking_and_automotive_services',
                  'professional_services', 'real_estate','retail_services', 'transportation',
                  'hospital','hotspots','school','total_business','holiday']