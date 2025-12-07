"""
URL configuration for AI Newscaster backend
"""
from django.contrib import admin
from django.urls import path, include
from users.urls import conversation_urlpatterns

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/auth/x/', include('x_auth.urls')),
    path('api/users/', include('users.urls')),
    path('api/conversations/', include(conversation_urlpatterns)),
]
