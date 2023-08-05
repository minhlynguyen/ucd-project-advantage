from django.urls import path
from .views import saved_list, saved_detail

app_name = 'save_api'

urlpatterns = [   
    path('',saved_list, name='zone_save_list'), #view multiple zone
    path('<int:zone>/', saved_detail, name = 'zone_get_delete'), #delete 1 zone from collection only
]