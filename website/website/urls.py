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
    path('api/user/save/',include('save_api.urls',namespace='save_api')),
    path('api/api-auth/', include('rest_framework.urls', namespace='rest_framework')), 
    # path('token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    # path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
]
