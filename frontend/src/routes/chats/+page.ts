import { browser } from '$app/environment';
import { getConversations, type ConversationSummary } from '$lib/api';

export async function load(): Promise<{ conversations: ConversationSummary[]; phoneNumber: string | null }> {
  if (!browser) {
    return { conversations: [], phoneNumber: null };
  }

  const phoneNumber = localStorage.getItem('phoneNumber');
  if (!phoneNumber) {
    return { conversations: [], phoneNumber: null };
  }

  try {
    const conversations = await getConversations(phoneNumber);
    return { conversations, phoneNumber };
  } catch (error) {
    console.error('Failed to load conversations:', error);
    return { conversations: [], phoneNumber };
  }
}
