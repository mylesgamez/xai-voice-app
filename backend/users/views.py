"""
User API views - provides token lookup for the Node.js telephony server
and conversation management for the web UI.
"""
import json
from datetime import timedelta

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.utils import timezone
from django.shortcuts import get_object_or_404

from .models import XUser, Conversation, Message
from .grok_api import send_to_grok
from x_auth.oauth import refresh_access_token


class GetUserTokenView(APIView):
    """
    GET /api/users/token?phone=+1234567890

    Called by Node.js telephony server to get user's X access token.
    Automatically refreshes expired tokens.
    """

    def get(self, request):
        phone_number = request.GET.get('phone')

        if not phone_number:
            return Response(
                {'error': 'phone parameter required'},
                status=status.HTTP_400_BAD_REQUEST
            )

        try:
            x_user = XUser.objects.get(phone_number=phone_number)
        except XUser.DoesNotExist:
            return Response(
                {'authenticated': False, 'message': 'User not found'},
                status=status.HTTP_404_NOT_FOUND
            )

        # Check if token needs refresh (with 5 min buffer)
        if x_user.token_expires_at <= timezone.now() + timedelta(minutes=5):
            try:
                refresh_token = x_user.get_refresh_token()
                token_response = refresh_access_token(refresh_token)

                if 'error' in token_response:
                    return Response(
                        {'authenticated': False, 'error': 'Token refresh failed'},
                        status=status.HTTP_401_UNAUTHORIZED
                    )

                # Update tokens
                x_user.set_tokens(
                    token_response['access_token'],
                    token_response.get('refresh_token', refresh_token)
                )
                x_user.token_expires_at = timezone.now() + timedelta(
                    seconds=token_response.get('expires_in', 7200)
                )
                x_user.save()

            except Exception as e:
                return Response(
                    {'authenticated': False, 'error': f'Token refresh error: {str(e)}'},
                    status=status.HTTP_401_UNAUTHORIZED
                )

        return Response({
            'authenticated': True,
            'access_token': x_user.get_access_token(),
            'x_user_id': x_user.x_user_id,
            'x_username': x_user.x_username,
            'x_name': x_user.x_name,
            # Seeded data for personalized greetings (top 10 of each)
            'following': x_user.following_data[:10] if x_user.following_data else [],
            'liked_tweets': x_user.liked_tweets_data[:10] if x_user.liked_tweets_data else [],
            'seeded_at': x_user.seeded_at.isoformat() if x_user.seeded_at else None,
        })


class CheckUserAuthView(APIView):
    """
    GET /api/users/check?phone=+1234567890

    Quick check if a user is authenticated (without returning tokens).
    Used by frontend to show connection status.
    """

    def get(self, request):
        phone_number = request.GET.get('phone')

        if not phone_number:
            return Response(
                {'error': 'phone parameter required'},
                status=status.HTTP_400_BAD_REQUEST
            )

        try:
            x_user = XUser.objects.get(phone_number=phone_number)
            return Response({
                'authenticated': True,
                'x_username': x_user.x_username,
                'x_name': x_user.x_name,
            })
        except XUser.DoesNotExist:
            return Response({'authenticated': False})


# ========================================
# Conversation API Views
# ========================================

class ConversationListCreateView(APIView):
    """
    GET /api/conversations?phone=...
        List all conversations for a user (identified by phone number)

    POST /api/conversations
        Create a new conversation (called by Node.js on call start)
        Body: { phone_number, call_id, title }
    """

    def get(self, request):
        phone_number = request.GET.get('phone')
        if not phone_number:
            return Response({'error': 'phone parameter required'}, status=status.HTTP_400_BAD_REQUEST)

        try:
            x_user = XUser.objects.get(phone_number=phone_number)
        except XUser.DoesNotExist:
            return Response({'error': 'User not found'}, status=status.HTTP_404_NOT_FOUND)

        conversations = Conversation.objects.filter(x_user=x_user)
        data = []
        for conv in conversations:
            last_message = conv.messages.last()
            data.append({
                'id': str(conv.id),
                'title': conv.title,
                'tags': conv.tags or [],
                'call_id': conv.call_id,
                'started_at': conv.started_at.isoformat(),
                'ended_at': conv.ended_at.isoformat() if conv.ended_at else None,
                'last_message': {
                    'role': last_message.role,
                    'content': last_message.content[:100],
                    'source': last_message.source,
                } if last_message else None,
                'message_count': conv.messages.count(),
            })

        return Response(data)

    def post(self, request):
        phone_number = request.data.get('phone_number')
        call_id = request.data.get('call_id')
        title = request.data.get('title', 'Phone Call')

        if not phone_number:
            return Response({'error': 'phone_number required'}, status=status.HTTP_400_BAD_REQUEST)

        try:
            x_user = XUser.objects.get(phone_number=phone_number)
        except XUser.DoesNotExist:
            return Response({'error': 'User not found'}, status=status.HTTP_404_NOT_FOUND)

        conversation = Conversation.objects.create(
            x_user=x_user,
            call_id=call_id,
            title=title,
        )

        return Response({
            'id': str(conversation.id),
            'title': conversation.title,
            'call_id': conversation.call_id,
            'started_at': conversation.started_at.isoformat(),
        }, status=status.HTTP_201_CREATED)


class ConversationDetailView(APIView):
    """
    GET /api/conversations/{id}?phone=...
        Get conversation details with all messages

    PATCH /api/conversations/{id}
        Update conversation (e.g., set ended_at)
        Body: { ended_at }
    """

    def get(self, request, conversation_id):
        phone_number = request.GET.get('phone')
        if not phone_number:
            return Response({'error': 'phone parameter required'}, status=status.HTTP_400_BAD_REQUEST)

        try:
            x_user = XUser.objects.get(phone_number=phone_number)
        except XUser.DoesNotExist:
            return Response({'error': 'User not found'}, status=status.HTTP_404_NOT_FOUND)

        conversation = get_object_or_404(Conversation, id=conversation_id, x_user=x_user)

        messages = []
        for msg in conversation.messages.all():
            messages.append({
                'id': msg.id,
                'role': msg.role,
                'content': msg.content,
                'source': msg.source,
                'created_at': msg.created_at.isoformat(),
            })

        return Response({
            'id': str(conversation.id),
            'title': conversation.title,
            'call_id': conversation.call_id,
            'started_at': conversation.started_at.isoformat(),
            'ended_at': conversation.ended_at.isoformat() if conversation.ended_at else None,
            'messages': messages,
        })

    def patch(self, request, conversation_id):
        from django.utils.dateparse import parse_datetime

        conversation = get_object_or_404(Conversation, id=conversation_id)

        if 'ended_at' in request.data:
            ended_at_value = request.data['ended_at']
            # Parse string to datetime if needed
            if isinstance(ended_at_value, str):
                conversation.ended_at = parse_datetime(ended_at_value) or timezone.now()
            else:
                conversation.ended_at = ended_at_value
        if 'title' in request.data:
            conversation.title = request.data['title']

        conversation.save()

        return Response({
            'id': str(conversation.id),
            'title': conversation.title,
            'ended_at': conversation.ended_at.isoformat() if conversation.ended_at else None,
        })


class ConversationMessagesView(APIView):
    """
    POST /api/conversations/{id}/messages
        Add a message to the conversation

        Body: {
            role: 'user' | 'assistant',
            content: string,
            source: 'voice' | 'text',
            generate_reply: boolean (optional, default false)
        }

        If generate_reply is true:
        - Saves the incoming message
        - Builds conversation history
        - Calls Grok Chat API
        - Saves and returns both messages
    """

    def post(self, request, conversation_id):
        conversation = get_object_or_404(Conversation, id=conversation_id)

        role = request.data.get('role')
        content = request.data.get('content')
        source = request.data.get('source', 'voice')
        generate_reply = request.data.get('generate_reply', False)

        if not role or not content:
            return Response(
                {'error': 'role and content are required'},
                status=status.HTTP_400_BAD_REQUEST
            )

        # Save the incoming message
        user_message = Message.objects.create(
            conversation=conversation,
            role=role,
            content=content,
            source=source,
        )

        response_data = {
            'user_message': {
                'id': user_message.id,
                'role': user_message.role,
                'content': user_message.content,
                'source': user_message.source,
                'created_at': user_message.created_at.isoformat(),
            }
        }

        # If generate_reply is True, call Grok and save the response
        if generate_reply and role == 'user':
            # Build conversation history
            history = []
            for msg in conversation.messages.all():
                history.append({
                    'role': msg.role,
                    'content': msg.content,
                })

            try:
                # Call Grok API
                assistant_content = send_to_grok(history)

                # Save assistant response
                assistant_message = Message.objects.create(
                    conversation=conversation,
                    role='assistant',
                    content=assistant_content,
                    source='text',
                )

                response_data['assistant_message'] = {
                    'id': assistant_message.id,
                    'role': assistant_message.role,
                    'content': assistant_message.content,
                    'source': assistant_message.source,
                    'created_at': assistant_message.created_at.isoformat(),
                }

            except Exception as e:
                # Return the user message but indicate Grok failed
                response_data['error'] = f'Failed to generate reply: {str(e)}'

        return Response(response_data, status=status.HTTP_201_CREATED)


class GenerateTitleView(APIView):
    """
    POST /api/conversations/{id}/generate-title

    Generate a title and topic tags for a conversation using Grok.
    Called automatically when a phone call ends.
    """

    def post(self, request, conversation_id):
        conversation = get_object_or_404(Conversation, id=conversation_id)

        # Get AI messages from conversation (first 5 for context)
        ai_messages = conversation.messages.filter(role='assistant')[:5]
        transcript = "\n".join([m.content[:200] for m in ai_messages])

        if not transcript:
            return Response({'title': 'Phone Call', 'tags': []})

        # Call Grok to generate title and tags
        prompt = f"""You are categorizing a saved conversation for a news assistant app.

Given this transcript, generate:
1. A short, descriptive title under 60 characters (no quotes, no emojis)
2. 1-2 topic tags from this list: AI, Markets, Politics, Tech, Sports, Entertainment, Your Circle, Breaking News

Respond in JSON format only:
{{"title": "your title here", "tags": ["Tag1", "Tag2"]}}

Transcript:
{transcript}"""

        try:
            response = send_to_grok([{'role': 'user', 'content': prompt}])

            # Parse JSON response
            data = json.loads(response.strip())
            title = data.get('title', 'Phone Call')[:60]
            tags = data.get('tags', [])[:2]  # Max 2 tags
        except (json.JSONDecodeError, AttributeError, Exception):
            title = 'Phone Call'
            tags = []

        conversation.title = title
        conversation.tags = tags
        conversation.save()

        return Response({'title': title, 'tags': tags})
