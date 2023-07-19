from main.models import Zone
from impression.models import Impression
from datetime import datetime
from django.utils.timezone import make_aware
import json


with open('../data-ingestions/draft_impression.json', 'r') as fd:    
    data = json.load(fd)
    # for row in data:
        # taxi_zone = Zone.objects.get(id=row['taxi_zone'])
    for row in data: 
        datestr = row['datetime']
    print(type(datestr))
    datetime = datetime.strptime(datestr, '%Y-%m-%d %H:%M:%S')
    print(type(datetime))
    taxi_zone = Zone.objects.only('id').get(id=data[1]['taxi_zone'])
    print(type(taxi_zone))
    impression = Impression.objects.create(datetime=make_aware(datetime), taxi_zone=taxi_zone)
    # break
        
