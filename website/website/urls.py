from django.contrib import admin
from django.urls import path,include
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)

urlpatterns = [
    path('api/admin/', admin.site.urls),
    path('api/main/',include('main.urls')),
    path('api/user/',include('user_api.urls')),
    path('api/save/',include('save_api.urls',namespace='save_api')),
    path('api/api-auth/', include('rest_framework.urls', namespace='rest_framework')), 
]
