from django.urls import path
from . import views
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)

urlpatterns = [
	path('register/', views.UserRegister.as_view(), name='register'),
	path('login/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('login/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('logout/', views.BlacklistTokenView.as_view(),name='blacklist'),
    path('admin/delete/', views.UserDeleteView.as_view(), name='delete_user'),
]
