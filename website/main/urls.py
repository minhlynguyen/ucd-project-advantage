from django.urls import path, include
from django.contrib import admin
from .views import SolutionsView, zones, zone_list, zone_detail #, AdvertiserList



urlpatterns = [
    # path('advertisers/', AdvertiserList.as_view()),
    path('solutions/',SolutionsView.as_view()),
    path('zones/',zones, name='zones'),
    # path('admin/super', admin.site.urls)
    path('zonelist/', zone_list),
    path('zone/<int:pk>/', zone_detail),
]