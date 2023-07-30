from rest_framework import serializers
from .models import ZoneDetail, Place, ZonePuma
# from impression.models import Impression
from django.core.serializers import serialize
from rest_framework_gis import serializers as geoserializers

class PlaceSerializer(geoserializers.GeoFeatureModelSerializer):

    class Meta:
        model = Place
        fields = ['id','big_cate','name','geom','taxi_zone']
        geo_field = 'geom'


class ZoneDataSerializer(serializers.ModelSerializer):

    class Meta:
        model = ZoneDetail
        fields = ['taxi_zone_id','datetime','impression_predict', 'entertainment_and_recreation',
                  'financial_services', 'food_and_beverage', 'parking_and_automotive_services',
                  'professional_services', 'real_estate','retail_services', 'transportation',
                  'hospital','hotspots','school','total_business','holiday']
        

class ZoneCensusSerializer(serializers.ModelSerializer):

    class Meta:
        model = ZonePuma
        fields = ['zone_id','median_income','females_under_5','females_5_14','females_15_24', 'females_25_34',
                  'females_35_44','females_45_54','females_55_64','females_65_74','females_75_84','females_85',
                  'males_under_5','males_5_14','males_15_24','males_25_34','males_35_44','males_45_54',
                  'males_55_64','males_65_74','males_75_84','males_85']