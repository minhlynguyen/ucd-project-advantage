from django.urls import path, include
from django.contrib import admin
from .views import SolutionsView, zones, zone_detail, place_in_zone, zone_data #, AdvertiserList

urlpatterns = [
    # path('advertisers/', AdvertiserList.as_view()),
    path('solutions/',SolutionsView.as_view()), # For testing, clean later
    path('zones/',zones, name='zones'),
    # path('admin/super', admin.site.urls)
    path('zones/<int:id>/', zone_detail),
    path('zones/<int:id>/places', place_in_zone),
    path('zones/data', zone_data),

]