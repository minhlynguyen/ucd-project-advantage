from django.urls import path
from .views import saved_list, saved_detail, saved_zone_info

app_name = 'save_api'

urlpatterns = [   
    path('',saved_list, name='zone_save_list'), #GET multiple zones in the saved list, POST 1 zone to save list
    path('<int:zone>/', saved_detail, name = 'zone_get_delete'), #GET or DELETE 1 zone from collection
    path('<int:zone>/info/', saved_zone_info, name = 'zone_info'), #GET or DELETE 1 zone from collection
]