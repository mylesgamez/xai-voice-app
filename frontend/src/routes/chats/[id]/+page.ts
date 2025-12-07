import { browser } from '$app/environment';
import { getConversation, type ConversationDetail } from '$lib/api';
import { error } from '@sveltejs/kit';

export async function load({ params }: { params: { id: string } }): Promise<{
  conversation: ConversationDetail | null;
  phoneNumber: string | null;
}> {
  if (!browser) {
    return { conversation: null, phoneNumber: null };
  }

  const phoneNumber = localStorage.getItem('phoneNumber');
  if (!phoneNumber) {
    return { conversation: null, phoneNumber: null };
  }

  try {
    const conversation = await getConversation(params.id, phoneNumber);
    return { conversation, phoneNumber };
  } catch (e) {
    console.error('Failed to load conversation:', e);
    throw error(404, 'Conversation not found');
  }
}
