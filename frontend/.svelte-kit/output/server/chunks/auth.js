import { w as writable } from "./index.js";
function createAuthStore() {
  const { subscribe, set, update } = writable({
    phoneNumber: null,
    isConnected: false,
    xUsername: null,
    xName: null,
    loading: true
  });
  return {
    subscribe,
    init: async () => {
      return;
    },
    setPhone: (phone) => {
      update((s) => ({ ...s, phoneNumber: phone }));
    },
    disconnect: () => {
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
const auth = createAuthStore();
export {
  auth as a
};
