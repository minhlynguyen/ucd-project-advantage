from rest_framework import serializers
from . import models

class AdvertiserSerializer(serializers.ModelSerializer):
    class Meta:
        model=models.Advertiser
        fields=['user','address']