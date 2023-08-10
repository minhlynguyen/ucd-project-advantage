from django.urls import path, include
from django.contrib import admin
from .views import zone_census, zone_hourly, place_in_zone, all_zones_today, all_zones_today_test

app_name = 'main'

urlpatterns = [
    path('census/',zone_census, name='zones'), #Census data of all zone
    path('census/<str:id>/',zone_census, name='one_zone_census'), #Census data of one zone
    path('hourly/', zone_hourly, name='zone_hourly'), #Hourly impression of 1 zone
    path('places/<int:id>/', place_in_zone, name='place_in_zone'), #Places in 1 zone 
    path('today/', all_zones_today, name="all_today"), #24h impression of all zones
    # path('today/test/',all_zones_today_test, name="all_today_test") #24h impression of all zones new solution
]