from django.urls import path
from .views import SavedList, SavedZone

app_name = 'save_api'

urlpatterns = [
    path('<int:pk>/', SavedZone.as_view(), name = 'zonesave'), #view 1 post only
    path('',SavedList.as_view(), name='zonesavelist'), #view multiple post

]