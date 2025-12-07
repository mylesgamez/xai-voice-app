from django.urls import path
from .views import GetUserTokenView, CheckUserAuthView

urlpatterns = [
    path('token', GetUserTokenView.as_view(), name='get_user_token'),
    path('check', CheckUserAuthView.as_view(), name='check_user_auth'),
]
