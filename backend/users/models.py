from django.db import models
from django.conf import settings
from cryptography.fernet import Fernet


class XUser(models.Model):
    """Stores X OAuth tokens for authenticated users, keyed by phone number"""

    # Phone number - how we identify callers from Twilio
    phone_number = models.CharField(max_length=20, unique=True, db_index=True)

    # X user info
    x_user_id = models.CharField(max_length=50, unique=True)
    x_username = models.CharField(max_length=50)
    x_name = models.CharField(max_length=100)

    # Encrypted tokens (stored as binary)
    access_token_encrypted = models.BinaryField()
    refresh_token_encrypted = models.BinaryField()

    # Token metadata
    token_expires_at = models.DateTimeField()
    scopes = models.TextField(blank=True)  # Space-separated scopes

    # Seeded data (cached from X API after OAuth)
    following_data = models.JSONField(default=list, blank=True)
    # Format: [{"id": "123", "username": "elonmusk", "name": "Elon Musk"}, ...]

    liked_tweets_data = models.JSONField(default=list, blank=True)
    # Format: [{"id": "123", "text": "...", "author_username": "...", "author_name": "..."}, ...]

    seeded_at = models.DateTimeField(null=True, blank=True)

    # Timestamps
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name = 'X User'
        verbose_name_plural = 'X Users'

    def __str__(self):
        return f"{self.x_name} (@{self.x_username}) - {self.phone_number}"

    def _get_fernet(self) -> Fernet:
        """Get Fernet instance for encryption/decryption"""
        key = settings.ENCRYPTION_KEY.encode()
        return Fernet(key)

    def set_tokens(self, access_token: str, refresh_token: str):
        """Encrypt and store tokens"""
        f = self._get_fernet()
        self.access_token_encrypted = f.encrypt(access_token.encode())
        if refresh_token:
            self.refresh_token_encrypted = f.encrypt(refresh_token.encode())

    def get_access_token(self) -> str:
        """Decrypt and return access token"""
        f = self._get_fernet()
        return f.decrypt(bytes(self.access_token_encrypted)).decode()

    def get_refresh_token(self) -> str:
        """Decrypt and return refresh token"""
        f = self._get_fernet()
        return f.decrypt(bytes(self.refresh_token_encrypted)).decode()
