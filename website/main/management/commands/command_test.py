from django.core.management.base import BaseCommand
from django.core import management
from io import StringIO
from django.dispatch import receiver
from main.models import Place
from main.serializers import find_key_with_highest_value
from django.core.serializers import serialize
from django.test import TestCase

class Command(BaseCommand):
    def handle(self, *args, **options):
        zone_data = {
            'category1': 10,
            'category2': 20,
            'category3': 15,
            'median_income': 50000
        }

        if not isinstance(zone_data, dict):
            print('This is not a dict')


        # Filter out 'median_income' key from consideration
        filtered_keys = [key for key in zone_data if key != 'median_income']
        print(filtered_keys)

        # Check if there are any keys to compare
        # if not filtered_keys:
        #     return None

        # Find the key with the highest value using the max function with a custom key function
        key_with_highest_value = max(filtered_keys, key=lambda k: zone_data[k])
        print(key_with_highest_value)

        # Add a pair of 'key_with_highest_value': name of the key back to the zone_data dictionary
        # zone_data['main_group'] = key_with_highest_value
        
        # # Assert that the result is the key with the highest value (category2 in this case)
        # result = find_key_with_highest_value(zone_data)
        # print(result)
        