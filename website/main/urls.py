from django.urls import path, include
from django.contrib import admin
from .import views
urlpatterns = [
    path('advertisers/', views.AdvertiserList.as_view()),
    # path('admin/super', admin.site.urls)
]