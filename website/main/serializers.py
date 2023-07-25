from rest_framework import serializers
from .models import Zone, ZoneDetail, Place
# from impression.models import Impression
from datetime import datetime
from django.core.serializers import serialize
from rest_framework_gis import serializers as geoserializers

# # class AdvertiserSerializer(serializers.ModelSerializer):
# #     class Meta:
# #         model=models.Advertiser
# #         fields=['user','address']

class DetailSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = ZoneDetail
        fields = ['datetime', 'impression_history', 'entertainment_and_recreation',
                   'financial_services','food_and_beverage', 'parking_and_automotive_services',
                   'professional_services','real_estate','retail_services','transportation', 
                   'hospital', 'hotspots','school', 'total_business']

# class ZoneSerializer(geoserializers.GeoFeatureModelSerializer):
class ZoneSerializer(serializers.ModelSerializer):    
    # queryset = ZoneDetail.objects.filter(datetime__exact=datetime.strptime("2023-04-30T23:00:00-0400", "%Y-%m-%dT%H:%M:%S%z"))

    zone_detail = DetailSerializer(many=True, read_only=True, source="current_detail")

    class Meta:
        model = Zone
        fields = ['id','name','borough','zone_detail']
        # geo_field = 'geom'

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