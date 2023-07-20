from rest_framework import serializers
from .models import Zone
from impression.models import Impression

# # class AdvertiserSerializer(serializers.ModelSerializer):
# #     class Meta:
# #         model=models.Advertiser
# #         fields=['user','address']

# Tested: Can only return one field at a time

# class ZoneSerializer(serializers.ModelSerializer):
#     impression_in_zone = serializers.SlugRelatedField(
#         many=True,
#         read_only=True,
#         slug_field='impression_history'
#     )

#     class Meta:
#         model=models.Zone
#         # fields='__all__'
#         fields=['id','name','borough','geom','impression_in_zone']

# Tested: Dont return detail

class DetailSerializer(serializers.ModelSerializer):
    class Meta:
        model = Impression
        fields = ['datetime','impression_history', 'impression_predict']

class ZoneSerializer(serializers.ModelSerializer):
    impression_in_zone = DetailSerializer(many=True, read_only=True)

    class Meta:
        model = Zone
        fields = ['id','name','borough','geom', 'impression_in_zone']