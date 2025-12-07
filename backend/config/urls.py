"""
URL configuration for AI Newscaster backend
"""
from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/auth/x/', include('x_auth.urls')),
    path('api/users/', include('users.urls')),
]
