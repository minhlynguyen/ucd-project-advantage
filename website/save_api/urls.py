from django.urls import path
from .views import SavedList, SavedZone

app_name = 'save_api'

urlpatterns = [   
    path('',SavedList.as_view(), name='zonesavelist'), #view multiple post
    path('<int:zone>/', SavedZone.as_view(), name = 'zonesave'), #delete 1 zone from collection only
]