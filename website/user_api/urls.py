from django.urls import path
from . import views
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)

urlpatterns = [
	path('register/', views.UserRegister.as_view(), name='register'),
	# path('login', views.UserLogin.as_view(), name='login'),
	path('login/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('login/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
	# path('logout', views.UserLogout.as_view(), name='logout'),
	# path('user/', views.UserView.as_view(), name='user'),
    path('logout/blacklist/', views.BlacklistTokenView.as_view(),name='blacklist')
]
