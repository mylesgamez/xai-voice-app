"""
X API service functions for fetching user data.
Used for seeding user context after OAuth authentication.
"""
import requests
import logging

logger = logging.getLogger(__name__)

X_API_BASE = 'https://api.x.com'


def fetch_user_following(access_token: str, user_id: str, max_results: int = 100) -> list:
    """
    Fetch users that the authenticated user follows.

    GET /2/users/{id}/following
    - max_results: up to 100
    - user.fields: id, name, username

    Returns: [{"id": "123", "name": "Elon Musk", "username": "elonmusk"}, ...]
    """
    url = f"{X_API_BASE}/2/users/{user_id}/following"
    params = {
        'max_results': str(max_results),
        'user.fields': 'id,name,username',
    }
    headers = {
        'Authorization': f'Bearer {access_token}',
        'Content-Type': 'application/json',
    }

    try:
        response = requests.get(url, params=params, headers=headers, timeout=30)
        response.raise_for_status()

        data = response.json()
        logger.info(f"[X-API] Fetched {len(data.get('data', []))} following")

        if 'errors' in data and data['errors']:
            error = data['errors'][0]
            logger.warning(f"[X-API] Following API error: {error.get('detail', error.get('title', 'Unknown'))}")
            return []

        return data.get('data', [])

    except requests.RequestException as e:
        logger.error(f"[X-API] Failed to fetch following: {e}")
        return []


def fetch_liked_tweets(access_token: str, user_id: str, max_pages: int = 2) -> list:
    """
    Fetch tweets that the authenticated user has liked.
    Fetches up to max_pages (default 2 pages, ~100 tweets).

    GET /2/users/{id}/liked_tweets
    - max_results: 100 per page
    - tweet.fields: id, text, author_id, created_at
    - expansions: author_id
    - user.fields: username, name

    Returns: [{"id": "123", "text": "...", "author_username": "...", "author_name": "..."}, ...]
    """
    url = f"{X_API_BASE}/2/users/{user_id}/liked_tweets"
    params = {
        'max_results': '100',
        'tweet.fields': 'id,text,author_id,created_at',
        'expansions': 'author_id',
        'user.fields': 'username,name',
    }
    headers = {
        'Authorization': f'Bearer {access_token}',
        'Content-Type': 'application/json',
    }

    all_tweets = []
    next_token = None

    for page in range(max_pages):
        try:
            current_params = params.copy()
            if next_token:
                current_params['pagination_token'] = next_token

            response = requests.get(url, params=current_params, headers=headers, timeout=30)
            response.raise_for_status()

            data = response.json()

            if 'errors' in data and data['errors']:
                error = data['errors'][0]
                logger.warning(f"[X-API] Liked tweets API error: {error.get('detail', error.get('title', 'Unknown'))}")
                break

            tweets = data.get('data', [])
            if not tweets:
                break

            # Build user map from includes
            user_map = {}
            if 'includes' in data and 'users' in data['includes']:
                for user in data['includes']['users']:
                    user_map[user['id']] = {
                        'username': user.get('username', ''),
                        'name': user.get('name', ''),
                    }

            # Add author info to each tweet
            for tweet in tweets:
                author_id = tweet.get('author_id', '')
                author_info = user_map.get(author_id, {})
                all_tweets.append({
                    'id': tweet.get('id', ''),
                    'text': tweet.get('text', ''),
                    'author_username': author_info.get('username', ''),
                    'author_name': author_info.get('name', ''),
                    'created_at': tweet.get('created_at', ''),
                })

            logger.info(f"[X-API] Fetched page {page + 1}: {len(tweets)} liked tweets")

            # Check for next page
            meta = data.get('meta', {})
            next_token = meta.get('next_token')
            if not next_token:
                break

        except requests.RequestException as e:
            logger.error(f"[X-API] Failed to fetch liked tweets (page {page + 1}): {e}")
            break

    logger.info(f"[X-API] Total liked tweets fetched: {len(all_tweets)}")
    return all_tweets
