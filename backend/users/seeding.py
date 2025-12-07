"""
Seeding service for fetching and storing user data from X API.
Called after successful OAuth authentication.
"""
import logging
from django.utils import timezone

logger = logging.getLogger(__name__)


def seed_user_data(x_user) -> bool:
    """
    Fetch and store user's following list and liked tweets.
    Called synchronously after OAuth success.

    Args:
        x_user: XUser model instance with valid access token

    Returns:
        True if seeding succeeded, False otherwise
    """
    from x_auth.x_api import fetch_user_following, fetch_liked_tweets

    try:
        access_token = x_user.get_access_token()
        user_id = x_user.x_user_id

        logger.info(f"[Seeding] Starting data seed for @{x_user.x_username} (ID: {user_id})")

        # Fetch following list (up to 100 users)
        following = fetch_user_following(access_token, user_id, max_results=100)
        x_user.following_data = following
        logger.info(f"[Seeding] Stored {len(following)} following")

        # Fetch liked tweets (2 pages, up to ~100 tweets)
        liked_tweets = fetch_liked_tweets(access_token, user_id, max_pages=2)
        x_user.liked_tweets_data = liked_tweets
        logger.info(f"[Seeding] Stored {len(liked_tweets)} liked tweets")

        # Mark seeding complete
        x_user.seeded_at = timezone.now()
        x_user.save()

        logger.info(f"[Seeding] Successfully seeded data for @{x_user.x_username}")
        return True

    except Exception as e:
        logger.error(f"[Seeding] Failed to seed data for @{x_user.x_username}: {e}")
        # Don't block OAuth on seeding failure - just log and continue
        return False
