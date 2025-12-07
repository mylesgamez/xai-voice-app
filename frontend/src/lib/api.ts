const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

export interface UserAuth {
  authenticated: boolean;
  x_username?: string;
  x_name?: string;
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
