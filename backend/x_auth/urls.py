from django.urls import path
from .views import StartOAuthView, OAuthCallbackView

urlpatterns = [
    path('start', StartOAuthView.as_view(), name='x_auth_start'),
    path('callback', OAuthCallbackView.as_view(), name='x_auth_callback'),
]
