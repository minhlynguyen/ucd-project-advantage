from rest_framework import serializers
from . import models

# # class AdvertiserSerializer(serializers.ModelSerializer):
# #     class Meta:
# #         model=models.Advertiser
# #         fields=['user','address']

class ZonesSerializer(serializers.ModelSerializer):
    class Meta:
        model=models.Zone
        fields='__all__'