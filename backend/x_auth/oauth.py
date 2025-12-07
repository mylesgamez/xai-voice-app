"""
OAuth 2.0 Authorization Code Flow with PKCE helpers for X API
"""
import hashlib
import base64
import secrets
import requests
from django.conf import settings


def generate_pkce():
    """Generate PKCE code_verifier and code_challenge (S256)"""
    # Generate a high-entropy code verifier
    code_verifier = secrets.token_urlsafe(64)[:128]

    # Create S256 code challenge
    code_challenge = base64.urlsafe_b64encode(
        hashlib.sha256(code_verifier.encode()).digest()
    ).decode().rstrip('=')

    return code_verifier, code_challenge


def get_authorize_url(state: str, code_challenge: str) -> str:
    """Build the X OAuth 2.0 authorization URL"""
    from urllib.parse import urlencode

    params = {
        'response_type': 'code',
        'client_id': settings.X_CLIENT_ID,
        'redirect_uri': settings.X_REDIRECT_URI,
        'scope': settings.X_SCOPES,
        'state': state,
        'code_challenge': code_challenge,
        'code_challenge_method': 'S256',
    }

    return f'https://x.com/i/oauth2/authorize?{urlencode(params)}'


def exchange_code_for_tokens(code: str, code_verifier: str) -> dict:
    """Exchange authorization code for access and refresh tokens"""
    response = requests.post(
        'https://api.x.com/2/oauth2/token',
        data={
            'grant_type': 'authorization_code',
            'code': code,
            'redirect_uri': settings.X_REDIRECT_URI,
            'client_id': settings.X_CLIENT_ID,
            'code_verifier': code_verifier,
        },
        auth=(settings.X_CLIENT_ID, settings.X_CLIENT_SECRET),
        headers={'Content-Type': 'application/x-www-form-urlencoded'}
    )

    return response.json()


def refresh_access_token(refresh_token: str) -> dict:
    """Refresh an expired access token"""
    response = requests.post(
        'https://api.x.com/2/oauth2/token',
        data={
            'grant_type': 'refresh_token',
            'refresh_token': refresh_token,
            'client_id': settings.X_CLIENT_ID,
        },
        auth=(settings.X_CLIENT_ID, settings.X_CLIENT_SECRET),
        headers={'Content-Type': 'application/x-www-form-urlencoded'}
    )

    return response.json()


def get_x_user_info(access_token: str) -> dict:
    """Get the authenticated user's X profile info"""
    response = requests.get(
        'https://api.x.com/2/users/me',
        headers={'Authorization': f'Bearer {access_token}'},
        params={'user.fields': 'id,name,username'}
    )

    return response.json()
