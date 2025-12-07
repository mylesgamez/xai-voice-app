import { writable } from 'svelte/store';
import { browser } from '$app/environment';
import { checkUserAuth } from '$lib/api';

interface AuthState {
  phoneNumber: string | null;
  isConnected: boolean;
  xUsername: string | null;
  xName: string | null;
  loading: boolean;
}

function createAuthStore() {
  const { subscribe, set, update } = writable<AuthState>({
    phoneNumber: null,
    isConnected: false,
    xUsername: null,
    xName: null,
    loading: true
  });

  return {
    subscribe,
    init: async () => {
      if (!browser) return;
      const phone = localStorage.getItem('phoneNumber');
      if (phone) {
        update(s => ({ ...s, phoneNumber: phone, loading: true }));
        const authResult = await checkUserAuth(phone);
        update(s => ({
          ...s,
          isConnected: authResult.authenticated,
          xUsername: authResult.x_username || null,
          xName: authResult.x_name || null,
          loading: false
        }));
      } else {
        update(s => ({ ...s, loading: false }));
      }
    },
    setPhone: (phone: string) => {
      if (browser) localStorage.setItem('phoneNumber', phone);
      update(s => ({ ...s, phoneNumber: phone }));
    },
    disconnect: () => {
      if (browser) localStorage.removeItem('phoneNumber');
      set({
        phoneNumber: null,
        isConnected: false,
        xUsername: null,
        xName: null,
        loading: false
      });
    }
  };
}

export const auth = createAuthStore();
