from django.shortcuts import render
from django.http import JsonResponse
from rest_framework import generics, response
from rest_framework.response import Response
from .models import SavedZone
from main.models import Zone
from .serializers import SavedSerializer
from rest_framework import permissions, status
from rest_framework.decorators import api_view, schema, permission_classes, authentication_classes
from main.serializers import zone_census_serializer, today_info

class SavedZonePermission(permissions.BasePermission):
    
    message = "User can only see and edit their own saved zone."

    def has_object_permission(self, request, view, obj):
        return obj.user == request.user.user_id


@api_view(['GET', 'POST'])
@permission_classes([SavedZonePermission])
def saved_list(request):
    """
    List all  saved zone of current user, or create a new saved zone.
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
            dict_item['zoneID'] = dict_item.pop('zone')
            dict_item.pop('added')            
            zone = Zone.objects.get(id=dict_item['zoneID'])
            dict_item['name'] = zone.name
            dict_item['borough'] = zone.borough
            census = zone_census_serializer(str(dict_item['zoneID']))
            dict_item['median_income'] = census['median_income']
            dict_item['mode_age_group'] = census['main_group']
            serializer_list_dict.append(dict_item)

        return Response({"status":"1","data":list(serializer_list_dict)})
    
    elif request.method == 'POST':
        try:
            serializer = SavedSerializer(data=request.data)        
            if serializer.is_valid():
                # serializer.save()
                SavedZone.objects.create(user=request.user, zone=Zone.objects.get(id=serializer.data["zone"]))
                return Response(serializer.data, status=status.HTTP_201_CREATED)
        except Exception as e:
            return Response({"status":"2","data":str(e)}, status=status.HTTP_205_RESET_CONTENT)


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
        return Response({"status":"1","data":serializer.data})

    elif request.method == 'DELETE':
        zone.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


@api_view(['GET'])
@permission_classes([SavedZonePermission])
def saved_zone_info(request, zone):
    """
    Retrieve information of a saved zone
    """
    user = request.user
    try:
        saved_zone = SavedZone.objects.get(user=user.user_id,zone=zone)
        zone = Zone.objects.get(id=saved_zone.zone.id)
        dict_item={}
        dict_item['zoneID'] = zone.id
        dict_item['name'] = zone.name
        dict_item['borough'] = zone.borough
        census = zone_census_serializer(str(zone.id))
        dict_item['median_income'] = census['median_income']
        dict_item['mode_age_group'] = census['main_group']
        dict_item['females_under_5'] = census['females_under_5']
        dict_item['females_5_14'] = census['females_5_14']
        dict_item['females_15_24'] = census['females_15_24']
        dict_item['females_25_34'] = census['females_25_34']
        dict_item['females_35_44'] = census['females_35_44']
        dict_item['females_45_54'] = census['females_45_54']
        dict_item['females_55_64'] = census['females_55_64']
        dict_item['females_65_74'] = census['females_65_74']
        dict_item['females_75_84'] = census['females_75_84']
        dict_item['females_85'] = census['females_85']
        dict_item['males_under_5'] = census['males_under_5']
        dict_item['males_5_14'] = census['males_5_14']
        dict_item['males_15_24'] = census['males_15_24']
        dict_item['males_25_34'] = census['males_25_34']
        dict_item['males_35_44'] = census['males_35_44']
        dict_item['males_45_54'] = census['males_45_54']
        dict_item['males_55_64'] = census['males_55_64']
        dict_item['males_65_74'] = census['males_65_74']
        dict_item['males_75_84'] = census['males_75_84']
        dict_item['males_85'] = census['males_85']
        detail = today_info(zone.id)
        dict_item['details'] = detail
        return Response({"status":"1","data":dict_item})
    except Exception as e:
        return Response({"status":"2","data":str(e)})