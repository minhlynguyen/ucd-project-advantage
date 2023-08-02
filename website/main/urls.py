from django.urls import path, include
from django.contrib import admin
from .views import zone_census, zone_detail, place_in_zone, zone_data

urlpatterns = [
    path('zones/',zone_census, name='zones'),
    path('zones/<int:id>/', zone_detail),
    path('zones/<int:id>/places', place_in_zone),
    path('zones/data/', zone_data, name="data"), 

]