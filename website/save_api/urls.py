from django.urls import path
from .views import ViewDeleteSavedZone, saved_list

app_name = 'save_api'

urlpatterns = [   
    path('',saved_list, name='zonesavelist'), #view multiple zone
    path('<int:zone>/', ViewDeleteSavedZone.as_view(), name = 'zonesave'), #delete 1 zone from collection only
]