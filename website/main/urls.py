from django.urls import path, include
from django.contrib import admin
from .views import SolutionsView, zones, geo_zones, zone_list, zone_detail #, AdvertiserList

urlpatterns = [
    # path('advertisers/', AdvertiserList.as_view()),
    path('solutions/',SolutionsView.as_view()), # For testing, clean later
    path('zones/',zones, name='zones'),
    path('geozones/',geo_zones,name="geozones"),
    # path('admin/super', admin.site.urls)
    path('zonelist/', zone_list),
    path('zonelist/<int:pk>/', zone_detail),
]