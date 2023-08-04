from django.shortcuts import render
from rest_framework import generics
from .models import SavedZone
from .serializers import SavedSerializer
from rest_framework import permissions, status

class SavedZonePermission(permissions.BasePermission):
    message = "User can only see and edit their own saved zone."

    def has_object_permission(self, request, view, obj):
        return obj.user == request.user

class SavedList(generics.ListCreateAPIView,SavedZonePermission): 
    
    permission_classes = (SavedZonePermission)
    # queryset = SavedZone.objects.all()
    serializer_class = SavedSerializer
    
    def get_queryset(self):
        """
        This view should return a list of all the saved zones
        for the currently authenticated user.
        """
        user = self.request.user
        return SavedZone.objects.filter(user=user)


class DeleteSavedZone(generics.RetrieveDestroyAPIView,SavedZonePermission):

    permission_classes = (SavedZonePermission)
    # queryset = SavedZone.objects.filter(zone.id=zone)
    serializer_class = SavedSerializer

    def get_queryset(self, zone):
        user = self.request.user
        return SavedZone.objects.filter(user=user,saved_zone_id=zone)

        



    