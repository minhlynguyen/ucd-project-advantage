from rest_framework import serializers
from .models import SavedZone

class SavedSerializer(serializers.ModelSerializer):
    class Meta:
        model = SavedZone
        fields = ('zone','added')   