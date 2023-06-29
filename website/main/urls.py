from django.urls import path
from .import views
urlpatterns = [
    path('advertisers/', views.AdvertiserList.as_view()),
]