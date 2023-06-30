from django.urls import path, include
from django.contrib import admin
from .views import SolutionsView, AdvertiserList, zones


urlpatterns = [
    path('advertisers/', AdvertiserList.as_view()),
    path('solutions/',SolutionsView.as_view()),
    path('zones/',zones)
    # path('admin/super', admin.site.urls)
]