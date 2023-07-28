# https://docs.djangoproject.com/en/4.1/ref/django-admin/#django.core.management.call_command

from django.core import management
import datetime
from django.utils import timezone

class Command(management.BaseCommand):
    
    def handle(self, *args, **kwargs):
        
        management.call_command('update_business','1') # 300000 is the maximum number of businesses to be read from the NYC API. Change to smaller number for testing
        
        for i in range(60): 
            datetime_item = timezone.now()+datetime.timedelta(days=i)
            management.call_command('calculate_business',datetime_item.strftime("%Y-%m-%d"))