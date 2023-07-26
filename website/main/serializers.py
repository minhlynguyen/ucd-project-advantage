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

# class ZoneDetailSerializer(serializers.ModelSerializer):
#     class Meta:

#         model = ZoneDetail
#         fields = ['datetime','impression_history', 'entertainment_and_recreation',
#                   'financial_services', 'food_and_beverage', 'parking_and_automotive_services',
#                   'professional_services', 'real_estate','retail_services', 'transportation',
#                   'hospital','hotspots','school','total_business','holiday']

# class ZoneDataSerializer(serializers.ModelSerializer):
#     detail = ZoneDetailSerializer(many=True, read_only=True)

#     class Meta:
#         model = ZoneDetail
#         fields = ['taxi_zone_id', 'detail']


class ZoneDataSerializer(serializers.ModelSerializer):

    class Meta:
        model = ZoneDetail
        fields = ['taxi_zone_id','datetime','impression_history', 'entertainment_and_recreation',
                  'financial_services', 'food_and_beverage', 'parking_and_automotive_services',
                  'professional_services', 'real_estate','retail_services', 'transportation',
                  'hospital','hotspots','school','total_business','holiday']
        
    def to_representation(self, instance):
        """Format the serialization structure"""
        ret = super().to_representation(instance)
        ret['id'] = ret['taxi_zone_id']
        ret['detail']={'datetime':ret['datetime'],
                     'impression_history':ret['datetime'], 
                     'entertainment_and_recreation':ret['entertainment_and_recreation'],
                     'financial_services':ret['financial_services'],
                     'food_and_beverage':ret['food_and_beverage'], 
                     'parking_and_automotive_services':ret['parking_and_automotive_services'],
                     'professional_services':ret['professional_services'],
                     'real_estate':ret['real_estate'],
                     'retail_services':ret['retail_services'], 
                     'transportation':ret['transportation'],
                     'hospital':ret['hospital'],
                     'hotspots':ret['hotspots'],
                     'school':ret['school'],
                     'total_business':ret['total_business'],
                     'holiday':ret['holiday']}
        keys = ['taxi_zone_id', 'datetime', 'impression_history', 'entertainment_and_recreation',
                'financial_services', 'food_and_beverage', 'parking_and_automotive_services',
                'professional_services', 'real_estate','retail_services', 'transportation',
                'hospital','hotspots','school','total_business','holiday'
                ]
        for key in keys:
            ret.pop(key,None)
        return ret