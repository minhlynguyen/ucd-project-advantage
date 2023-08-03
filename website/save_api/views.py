from django.shortcuts import render
from rest_framework import generics
from .models import SavedZone
from .serializers import SavedSerializer

class SavedList(generics.ListCreateAPIView): 
    queryset = SavedZone.objects.all()
    serializer_class = SavedSerializer
    # pass

class SavedZone(generics.RetrieveDestroyAPIView):
    pass
               