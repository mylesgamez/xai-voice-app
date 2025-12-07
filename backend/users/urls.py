from django.urls import path
from .views import (
    GetUserTokenView,
    CheckUserAuthView,
    ConversationListCreateView,
    ConversationDetailView,
    ConversationMessagesView,
)

urlpatterns = [
    path('token', GetUserTokenView.as_view(), name='get_user_token'),
    path('check', CheckUserAuthView.as_view(), name='check_user_auth'),
]

# Conversation endpoints
conversation_urlpatterns = [
    path('', ConversationListCreateView.as_view(), name='conversation_list_create'),
    path('<uuid:conversation_id>', ConversationDetailView.as_view(), name='conversation_detail'),
    path('<uuid:conversation_id>/messages', ConversationMessagesView.as_view(), name='conversation_messages'),
]
