from rest_framework import serializers
from .models import ZoneDetail, Place, ZonePuma, Zone, ZoneToday
# from impression.models import Impression
from django.core.serializers import serialize
from rest_framework_gis import serializers as geoserializers
from django.db.models import Count, Q, Sum, Avg
from django.utils import timezone
import datetime

class PlaceSerializer(geoserializers.GeoFeatureModelSerializer):

    class Meta:
        model = Place
        fields = ['id','big_cate','name','geom','taxi_zone']
        geo_field = 'geom'


class ZoneDataSerializer(serializers.ModelSerializer):

    class Meta:
        model = ZoneDetail
        fields = ['taxi_zone_id','datetime','impression_predict', 'entertainment_and_recreation',
                  'financial_services', 'food_and_beverage', 'parking_and_automotive_services',
                  'professional_services', 'real_estate','retail_services', 'transportation',
                  'hospital','hotspots','school','total_business','holiday']
        
class ZoneTodaySerializer(serializers.ModelSerializer):
    
    class Meta:
        model=ZoneToday
        fields = ['zone_id','date_time','impression_predict', 'entertainment_and_recreation',
                  'financial_services', 'food_and_beverage', 'parking_and_automotive_services',
                  'professional_services', 'real_estate','retail_services', 'transportation',
                  'hospital','hotspots','school','total_business','holiday']
        
def find_key_with_highest_value(zone_data):
    if not isinstance(zone_data, dict):
        return None

    # Filter out 'median_income' key from consideration
    filtered_keys = [key for key in zone_data if key != 'median_income']

    if not filtered_keys:
        return None

    # Find the key with the highest value using the max function with a custom key function
    key_with_highest_value = max(filtered_keys, key=lambda k: zone_data[k])

    # Add a pair of 'key_with_highest_value': name of the key back to the zone_data dictionary
    zone_data['main_group'] = key_with_highest_value
    
    # Return the key
    return key_with_highest_value

def zone_census_serializer(id=None):

    full_zone = ZonePuma.objects.filter(median_income__isnull=False).aggregate(Avg('median_income'),
                                                            Avg('females_under_5'),Avg('females_5_14'),
                                                            Avg('females_15_24'),Avg('females_25_34'),
                                                            Avg('females_35_44'),Avg('females_45_54'),
                                                            Avg('females_55_64'),Avg('females_65_74'),
                                                            Avg('females_75_84'),Avg('females_85'),
                                                            Avg('males_under_5'),Avg('males_5_14'),
                                                            Avg('males_15_24'),Avg('males_25_34'),
                                                            Avg('males_35_44'),Avg('males_45_54'),
                                                            Avg('males_55_64'),Avg('males_65_74'),
                                                            Avg('males_75_84'),Avg('males_85')
    )

    blank_zone = Zone.objects.filter(zone_puma__isnull=True)
    
    agg = ZonePuma.objects.values("zone").annotate(Sum('median_income'),
                                                   Sum('females_under_5'), Sum('females_5_14'),
                                                    Sum('females_15_24'), Sum('females_25_34'),
                                                    Sum('females_35_44'), Sum('females_45_54'),
                                                    Sum('females_55_64'), Sum('females_65_74'),
                                                    Sum('females_75_84'), Sum('females_85'),
                                                    Sum('males_under_5'), Sum('males_5_14'), 
                                                    Sum('males_15_24'), Sum('males_25_34'), 
                                                    Sum('males_35_44'), Sum('males_45_54'), 
                                                    Sum('males_55_64'), Sum('males_65_74'), 
                                                    Sum('males_75_84'), Sum('males_85')
                                                    )

    # data = []
    data = {}
    
    for d in agg:
        othes_sum = sum(d[key] for key in ['females_under_5__sum', 'females_5_14__sum', 
                                           'females_15_24__sum', 'females_25_34__sum',
                                           'females_35_44__sum', 'females_45_54__sum', 
                                            'females_55_64__sum', 'females_65_74__sum',
                                            'females_75_84__sum', 'females_85__sum',
                                            'males_under_5__sum', 'males_5_14__sum',
                                            'males_15_24__sum', 'males_25_34__sum',
                                            'males_35_44__sum','males_45_54__sum',
                                            'males_55_64__sum','males_65_74__sum',
                                            'males_75_84__sum'])
        males_85__sum = 100.0 - othes_sum
        d['males_85__sum'] = males_85__sum
        # data.append({d['zone']: {k[:-5]: v for k, v in d.items() if k != 'zone'}})
        data[str(d['zone'])] = {k[:-5]: v for k, v in d.items() if k != 'zone'}

    for zone in blank_zone:
        data[zone.id] = {'median_income': full_zone['median_income__avg'],
                        'females_under_5': full_zone['females_under_5__avg'],        
                        'females_5_14': full_zone['females_5_14__avg'],        
                        'females_15_24' : full_zone['females_15_24__avg'],
                        'females_25_34' : full_zone['females_25_34__avg'],
                        'females_35_44' : full_zone['females_35_44__avg'],
                        'females_45_54' : full_zone['females_45_54__avg'],
                        'females_55_64' : full_zone['females_55_64__avg'],
                        'females_65_74' : full_zone['females_65_74__avg'],
                        'females_75_84' : full_zone['females_75_84__avg'],
                        'females_85' : full_zone['females_85__avg'],
                        'males_under_5' : full_zone['males_under_5__avg'],
                        'males_5_14' : full_zone['males_5_14__avg'],
                        'males_15_24' : full_zone['males_15_24__avg'],
                        'males_25_34' : full_zone['males_25_34__avg'],
                        'males_35_44' : full_zone['males_35_44__avg'],
                        'males_45_54' : full_zone['males_45_54__avg'],
                        'males_55_64' : full_zone['males_55_64__avg'],
                        'males_65_74' : full_zone['males_65_74__avg'],
                        'males_75_84' : full_zone['males_75_84__avg'],
                        'males_85' : full_zone['males_85__avg']
        }

    for zone_id, zone_data in data.items():
        find_key_with_highest_value(zone_data)

    if id == None:
        return(data)
    else: 
        return(data.get(id))
    
def today_info(id=None):
    now=timezone.now()
    year, month, day= now.strftime("%Y"), now.strftime("%m"), now.strftime("%d")
    zones = ZoneDetail.objects.filter(datetime__date=datetime.date(int(year), int(month), int(day))).order_by("taxi_zone_id","datetime")

    if id == None:
        serializer = ZoneDataSerializer(zones,many=True)
        data = serializer.data
        data = {
            item["taxi_zone_id"]: {
                "detail": [
                    {
                        k: v
                        for k, v in entry.items()
                        if k != "taxi_zone_id"
                    }
                for entry in data
                if entry["taxi_zone_id"] == item["taxi_zone_id"]
                ]
            }
            for item in data
        }
        return data
    
    else:
        zone = zones.filter(taxi_zone_id=id)
        serializer = ZoneDataSerializer(zone,many=True)
        data = serializer.data
        for item in data:
            item.pop('taxi_zone_id')
        return data

def today_info_new(id=None):
    zones = ZoneToday.objects.all().order_by("zone_id","date_time")
    if id == None:
        serializer = ZoneTodaySerializer(zones,many=True)
        data = serializer.data
        data = {
            item["zone_id"]: {
                "detail": [
                    {
                        k: v
                        for k, v in entry.items()
                        if k != "zone_id"
                    }
                for entry in data
                if entry["zone_id"] == item["zone_id"]
                ]
            }
            for item in data
        }
        return data
    
    else:
        zone = zones.filter(taxi_zone_id=id)
        serializer = ZoneTodaySerializer(zone,many=True)
        data = serializer.data
        for item in data:
            item.pop('zone_id')
        return data


