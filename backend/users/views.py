"""
User API views - provides token lookup for the Node.js telephony server
"""
from datetime import timedelta

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.utils import timezone

from .models import XUser
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
