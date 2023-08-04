from django.shortcuts import render
from django.http import JsonResponse
from rest_framework import generics, response
from .models import SavedZone
from .serializers import SavedSerializer
from rest_framework import permissions, status
from rest_framework.decorators import api_view, schema, permission_classes

class SavedZonePermission(permissions.BasePermission):
    
    message = "User can only see and edit their own saved zone."

    def has_object_permission(self, request, view, obj):
        return obj.user == request.user.user_id

@api_view(['GET', 'POST'])
@permission_classes([SavedZonePermission])
def saved_list(request):
    """
    This view should return a list of all the saved zones
    for the currently authenticated user.
    """
    user = request.user
    try:
        zones = SavedZone.objects.filter(user=user.user_id)
    
    except Exception as e:
        return response.Response({"status":"2","data":str(e)})
    
    if request.method == 'GET':
        serializer = SavedSerializer(zones,many=True)
        return response.Response({"status":"1","data":str(serializer.data)})


class ViewDeleteSavedZone(generics.RetrieveDestroyAPIView,SavedZonePermission):

    permission_classes = [SavedZonePermission]
    # queryset = SavedZone.objects.filter(zone.id=zone)
    serializer_class = SavedSerializer

    def get_queryset(self):
        user = self.request.user
        zone = self.request.zone
        return SavedZone.objects.filter(user=user,zone__id=zone)

        



    