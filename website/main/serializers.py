from rest_framework import serializers
from .models import Zone, ZoneDetail
# from impression.models import Impression
from datetime import datetime

# # class AdvertiserSerializer(serializers.ModelSerializer):
# #     class Meta:
# #         model=models.Advertiser
# #         fields=['user','address']

class DetailSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = ZoneDetail
        fields = '__all__'

class ZoneSerializer(serializers.ModelSerializer):
    
    # queryset = ZoneDetail.objects.filter(datetime__exact=datetime.strptime("2023-04-30T23:00:00-0400", "%Y-%m-%dT%H:%M:%S%z"))

    zone_detail = DetailSerializer(many=True, read_only=True, source="current_detail")

    class Meta:
        model = Zone
        fields = ['id','name','borough','geom', 'zone_detail']