"""
Grok Chat API integration for text-based conversation continuation.
"""
import os
import logging
import requests

logger = logging.getLogger(__name__)

XAI_API_KEY = os.environ.get('XAI_API_KEY', '')


def send_to_grok(conversation_history: list[dict], model: str = 'grok-3-mini') -> str:
    """
    Send conversation history to xAI Chat API and get response.

    Args:
        conversation_history: List of messages in format:
            [{"role": "user", "content": "..."}, {"role": "assistant", "content": "..."}, ...]
        model: Model to use (default: grok-3-mini for cost savings)
            Options: grok-3-latest ($3/$15 per 1M tokens), grok-3-mini ($0.30/$0.50 per 1M tokens)

    Returns:
        Assistant's response content string
    """
    if not XAI_API_KEY:
        logger.error("[Grok API] XAI_API_KEY not configured")
        raise ValueError("XAI_API_KEY environment variable not set")

    try:
        response = requests.post(
            'https://api.x.ai/v1/chat/completions',
            headers={
                'Authorization': f'Bearer {XAI_API_KEY}',
                'Content-Type': 'application/json',
            },
            json={
                'model': model,
                'messages': conversation_history,
            },
            timeout=60
        )

        response.raise_for_status()
        data = response.json()

        assistant_content = data['choices'][0]['message']['content']
        logger.info(f"[Grok API] Response received ({len(assistant_content)} chars)")

        return assistant_content

    except requests.RequestException as e:
        logger.error(f"[Grok API] Request failed: {e}")
        raise
    except (KeyError, IndexError) as e:
        logger.error(f"[Grok API] Unexpected response format: {e}")
        raise ValueError(f"Invalid response from Grok API: {e}")
