from rest_framework import serializers
from .models import ZoneDetail, Place, ZonePuma
# from impression.models import Impression
from django.core.serializers import serialize
from rest_framework_gis import serializers as geoserializers
from django.db.models import Count, Q, Sum, Avg

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
        

# class ZoneCensusSerializer(serializers.ModelSerializer):

#     class Meta:
#         model = ZonePuma
#         fields = ['zone_id','median_income','females_under_5','females_5_14','females_15_24', 'females_25_34',
#                   'females_35_44','females_45_54','females_55_64','females_65_74','females_75_84','females_85',
#                   'males_under_5','males_5_14','males_15_24','males_25_34','males_35_44','males_45_54',
#                   'males_55_64','males_65_74','males_75_84','males_85']

def find_main_group(d):

    """Find the key with highest value in the list of age group"""

    id_value = next(iter(d))
    inner_dict = d[id_value]

    # Filter out 'median_income' key from consideration
    filtered_keys = [key for key in inner_dict if key != 'median_income']

    # Find the key with the highest value using the max function with a custom key function
    main_group = max(filtered_keys, key=lambda k: inner_dict[k])

    # Add the key with the highest value back to the inner dictionary
    inner_dict['main_group'] = main_group
    return d

def ZoneCensusSerializer():

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

    blank_zone = ZonePuma.objects.filter(median_income__isnull=True)

    for zone in blank_zone:
        zone.females_under_5 = full_zone['females_under_5__avg']
        zone.females_15_24 = full_zone['females_15_24__avg']
        zone.females_25_34 = full_zone['females_25_24__avg']
        zone.females_35_44 = full_zone['females_35_24__avg']
        zone.females_45_54 = full_zone['females_45_24__avg']
        zone.females_55_64 = full_zone['females_55_24__avg']
        zone.females_65_74 = full_zone['females_65_24__avg']
        zone.females_75_84 = full_zone['females_75_24__avg']
        zone.females_85 = full_zone['females_85__avg']
        zone.males_under_5 = full_zone['males_under_5__avg']
        zone.males_15_24 = full_zone['males_15_24__avg']
        zone.males_25_34 = full_zone['males_25_34__avg']
        zone.males_35_44 = full_zone['males_35_44__avg']
        zone.males_45_54 = full_zone['males_45_54__avg']
        zone.males_55_64 = full_zone['males_55_64__avg']
        zone.males_65_74 = full_zone['males_65_74__avg']
        zone.males_75_84 = full_zone['males_75_84__avg']
        zone.males_85 = full_zone['males_85__avg']
        zone.save()        
    
    agg = ZonePuma.objects.values("zone").annotate(Sum('median_income'),Sum('females_under_5'),
                                                    Sum('females_5_14'),Sum('females_15_24'),
                                                    Sum('females_25_34'),Sum('females_35_44'),
                                                    Sum('females_45_54'),Sum('females_55_64'),
                                                    Sum('females_65_74'),
                                                    Sum('females_75_84'),Sum('females_85'),
                                                    Sum('males_under_5'),Sum('males_5_14'),
                                                    Sum('males_15_24'),Sum('males_25_34'),
                                                    Sum('males_35_44'),Sum('males_45_54'),
                                                    Sum('males_55_64'),Sum('males_65_74'),
                                                    Sum('males_75_84'),Sum('males_85')
                                                    )

    data = []
    
    for d in agg:
        othes_sum = sum(d[key] for key in ['females_under_5__sum', 'females_5_14__sum', 'females_15_24__sum', 
                                            'females_25_34__sum','females_35_44__sum', 'females_45_54__sum', 
                                            'females_55_64__sum', 'females_65_74__sum',
                                            'females_75_84__sum', 'females_85__sum','males_under_5__sum',
                                            'males_5_14__sum','males_15_24__sum',
                                            'males_25_34__sum','males_35_44__sum','males_45_54__sum','males_55_64__sum',
                                            'males_65_74__sum','males_75_84__sum'])
        males_85__sum = 100.0 - othes_sum
        d['males_85__sum'] = males_85__sum
        data.append({d['zone']: {k[:-5]: v for k, v in d.items() if k != 'zone'}})

    result = [find_main_group(d) for d in data]

    return(result)





