from django.urls import path
from .views import SavedList, ViewDeleteSavedZone

app_name = 'save_api'

urlpatterns = [   
    path('',SavedList.as_view(), name='zonesavelist'), #view multiple zone
    path('<int:zone>/', ViewDeleteSavedZone.as_view(), name = 'zonesave'), #delete 1 zone from collection only
]