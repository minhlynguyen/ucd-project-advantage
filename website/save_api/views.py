from django.shortcuts import render
from django.http import JsonResponse
from rest_framework import generics
from .models import SavedZone
from .serializers import SavedSerializer
from rest_framework import permissions, status
from rest_framework.decorators import api_view, schema, authentication_classes

class SavedZonePermission(permissions.BasePermission):
    
    message = "User can only see and edit their own saved zone."

    def has_object_permission(self, request, view, obj):
        return obj.user == request.user.user_id

class SavedList(generics.ListAPIView,SavedZonePermission): 

    permission_classes = [SavedZonePermission]
    serializer_class = SavedSerializer
    
    def get_queryset(self):
        """
        This view should return a list of all the saved zones
        for the currently authenticated user.
        """
        user = self.request.user
        queryset = SavedZone.objects.filter(user=user.user_id)
        return queryset

@api_view(['GET','POST'])
@authentication_classes(SavedZonePermission,)
def saved_list(request):
    user = request.user
    try:
        zone_list = SavedZone.objects.filter(user=user.user_id)
        
    except Exception as e:
        return JsonResponse({"status":"2","data":str(e)},status=200)
    if request.method == 'GET':
        return JsonResponse({"status":"1","data":places},status=200,safe=False)


class ViewDeleteSavedZone(generics.RetrieveDestroyAPIView,SavedZonePermission):

    permission_classes = [SavedZonePermission]
    # queryset = SavedZone.objects.filter(zone.id=zone)
    serializer_class = SavedSerializer

    def get_queryset(self):
        user = self.request.user
        zone = self.request.zone
        return SavedZone.objects.filter(user=user,zone__id=zone)

        



    