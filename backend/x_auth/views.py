"""
OAuth 2.0 views for X authentication
"""
import secrets
from datetime import datetime, timedelta

from django.http import JsonResponse, HttpResponseRedirect
from django.views import View
from django.conf import settings
from django.utils import timezone

from .oauth import generate_pkce, get_authorize_url, exchange_code_for_tokens, get_x_user_info
from users.models import XUser


# In-memory state storage (use Redis in production for multi-server deployments)
oauth_states = {}


def cleanup_expired_states():
    """Remove states older than 10 minutes"""
    now = datetime.now()
    expired = [k for k, v in oauth_states.items()
               if (now - v['created_at']).seconds > 600]
    for k in expired:
        del oauth_states[k]


class StartOAuthView(View):
    """
    GET /api/auth/x/start?phone=+1234567890

    Initiates the OAuth flow by redirecting to X's authorization page.
    """

    def get(self, request):
        phone_number = request.GET.get('phone')

        if not phone_number:
            return JsonResponse({'error': 'phone parameter required'}, status=400)

        # Cleanup old states
        cleanup_expired_states()

        # Generate state and PKCE challenge
        state = secrets.token_urlsafe(32)
        code_verifier, code_challenge = generate_pkce()

        # Store state -> (phone, code_verifier) mapping
        oauth_states[state] = {
            'phone_number': phone_number,
            'code_verifier': code_verifier,
            'created_at': datetime.now()
        }

        # Redirect to X authorization
        authorize_url = get_authorize_url(state, code_challenge)
        return HttpResponseRedirect(authorize_url)


class OAuthCallbackView(View):
    """
    GET /api/auth/x/callback?code=...&state=...

    Handles the OAuth callback from X, exchanges code for tokens,
    and stores the user's credentials.
    """

    def get(self, request):
        code = request.GET.get('code')
        state = request.GET.get('state')
        error = request.GET.get('error')

        # Handle user denial
        if error:
            return HttpResponseRedirect(f'{settings.FRONTEND_URL}/?error={error}')

        # Validate state
        if not state or state not in oauth_states:
            return JsonResponse({'error': 'Invalid or expired state'}, status=400)

        state_data = oauth_states.pop(state)
        phone_number = state_data['phone_number']
        code_verifier = state_data['code_verifier']

        # Exchange code for tokens
        token_response = exchange_code_for_tokens(code, code_verifier)

        if 'error' in token_response:
            error_desc = token_response.get('error_description', token_response['error'])
            return HttpResponseRedirect(f'{settings.FRONTEND_URL}/?error={error_desc}')

        access_token = token_response['access_token']
        refresh_token = token_response.get('refresh_token', '')
        expires_in = token_response.get('expires_in', 7200)
        scopes = token_response.get('scope', '')

        # Get X user info
        user_info = get_x_user_info(access_token)

        if 'errors' in user_info:
            error_msg = user_info['errors'][0].get('message', 'Failed to get user info')
            return HttpResponseRedirect(f'{settings.FRONTEND_URL}/?error={error_msg}')

        x_user_data = user_info.get('data', {})

        if not x_user_data:
            return HttpResponseRedirect(f'{settings.FRONTEND_URL}/?error=No user data returned')

        # Create or update XUser
        try:
            x_user, created = XUser.objects.update_or_create(
                phone_number=phone_number,
                defaults={
                    'x_user_id': x_user_data.get('id'),
                    'x_username': x_user_data.get('username'),
                    'x_name': x_user_data.get('name'),
                    'token_expires_at': timezone.now() + timedelta(seconds=expires_in),
                    'scopes': scopes,
                }
            )
            x_user.set_tokens(access_token, refresh_token)
            x_user.save()
        except Exception as e:
            return HttpResponseRedirect(f'{settings.FRONTEND_URL}/?error=Failed to save user: {str(e)}')

        # Redirect to success page
        return HttpResponseRedirect(f'{settings.FRONTEND_URL}/dashboard?connected=true')
