const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

export interface UserAuth {
  authenticated: boolean;
  x_username?: string;
  x_name?: string;
}

export interface Message {
  id: number;
  role: 'user' | 'assistant' | 'system';
  content: string;
  source: 'voice' | 'text';
  created_at: string;
}

export interface ConversationSummary {
  id: string;
  title: string;
  call_id: string | null;
  started_at: string;
  ended_at: string | null;
  last_message: {
    role: string;
    content: string;
    source: string;
  } | null;
  message_count: number;
}

export interface ConversationDetail {
  id: string;
  title: string;
  call_id: string | null;
  started_at: string;
  ended_at: string | null;
  messages: Message[];
}

export interface SendMessageResponse {
  user_message: Message;
  assistant_message?: Message;
  error?: string;
}

export async function checkUserAuth(phoneNumber: string): Promise<UserAuth> {
  try {
    const response = await fetch(
      `${API_URL}/api/users/check?phone=${encodeURIComponent(phoneNumber)}`
    );

    if (!response.ok) {
      return { authenticated: false };
    }

    return await response.json();
  } catch (error) {
    console.error('Failed to check user auth:', error);
    return { authenticated: false };
  }
}

export async function getConversations(phoneNumber: string): Promise<ConversationSummary[]> {
  const response = await fetch(
    `${API_URL}/api/conversations/?phone=${encodeURIComponent(phoneNumber)}`
  );
  if (!response.ok) {
    throw new Error('Failed to fetch conversations');
  }
  return response.json();
}

export async function getConversation(conversationId: string, phoneNumber: string): Promise<ConversationDetail> {
  const response = await fetch(
    `${API_URL}/api/conversations/${conversationId}?phone=${encodeURIComponent(phoneNumber)}`
  );
  if (!response.ok) {
    throw new Error('Failed to fetch conversation');
  }
  return response.json();
}

export async function sendMessage(
  conversationId: string,
  content: string
): Promise<SendMessageResponse> {
  const response = await fetch(
    `${API_URL}/api/conversations/${conversationId}/messages`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        role: 'user',
        content,
        source: 'text',
        generate_reply: true
      })
    }
  );
  if (!response.ok) {
    throw new Error('Failed to send message');
  }
  return response.json();
}
