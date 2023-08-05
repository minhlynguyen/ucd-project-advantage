from django.shortcuts import render
from django.http import JsonResponse
from rest_framework import generics, response
from rest_framework.response import Response
from .models import SavedZone
from main.models import Zone
from .serializers import SavedSerializer
from rest_framework import permissions, status
from rest_framework.decorators import api_view, schema, permission_classes
from main.serializers import zone_census_serializer


class SavedZonePermission(permissions.BasePermission):
    
    message = "User can only see and edit their own saved zone."

    def has_object_permission(self, request, view, obj):
        return obj.user == request.user.user_id

@api_view(['GET', 'POST'])
@permission_classes([SavedZonePermission])
def saved_list(request):
    """
    List all code saved zone of current user, or create a new saved zone.
    """
    user = request.user
    try:
        zones = SavedZone.objects.filter(user=user.user_id)
    
    except Exception as e:
        return Response({"status":"2","data":str(e)})
    
    if request.method == 'GET':
        serializer = SavedSerializer(zones,many=True)
        serializer_list = list(serializer.data)
        serializer_list_dict = []
        for item in serializer_list:
            dict_item = dict(item)
            dict_item.pop('added')
            zone = Zone.objects.get(id=dict_item['zone'])
            dict_item['name'] = zone.name
            dict_item['borough'] = zone.borough
            census = zone_census_serializer(str(dict_item['zone']))
            dict_item['median_income'] = census['median_income']
            dict_item['mode_age_group'] = census['main_group']
            serializer_list_dict.append(dict_item)

        return Response({"status":"1","data":str(serializer_list_dict)})
    
    elif request.method == 'POST':
        serializer = SavedSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET', 'DELETE'])
@permission_classes([SavedZonePermission])
def saved_detail(request, zone):
    """
    Retrieve or delete a saved zone.
    """
    user = request.user
    try:
        zone = SavedZone.objects.get(user=user.user_id,zone=zone)
    
    except Exception as e:
        return Response({"status":"2","data":str(e)})
    
    if request.method == 'GET':
        serializer = SavedSerializer(zone)
        return Response({"status":"1","data":str(serializer.data)})

    elif request.method == 'DELETE':
        zone.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


    