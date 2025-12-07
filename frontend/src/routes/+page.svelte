<script lang="ts">
  import { onMount } from 'svelte';
  import { goto } from '$app/navigation';
  import { browser } from '$app/environment';
  import { checkUserAuth } from '$lib/api';

  let phoneNumber = $state('');
  let isLoading = $state(false);
  let checkingAuth = $state(true);

  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

  onMount(async () => {
    if (browser) {
      const phone = localStorage.getItem('phoneNumber');
      if (phone) {
        const auth = await checkUserAuth(phone);
        if (auth.authenticated) {
          goto('/chats');
          return;
        }
      }
    }
    checkingAuth = false;
  });

  function connectX() {
    if (!phoneNumber) {
      alert('Please enter your phone number');
      return;
    }
    isLoading = true;
    // Save phone number to localStorage for later use
    localStorage.setItem('phoneNumber', phoneNumber);
    // Redirect to Django OAuth start
    window.location.href = `${API_URL}/api/auth/x/start?phone=${encodeURIComponent(phoneNumber)}`;
  }

  function formatPhone(e: Event) {
    const input = e.target as HTMLInputElement;
    // Basic formatting - just ensure it starts with +
    if (input.value && !input.value.startsWith('+')) {
      phoneNumber = '+' + input.value.replace(/[^0-9]/g, '');
    }
  }
</script>

{#if checkingAuth}
<div class="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 to-black">
  <div class="text-white">Loading...</div>
</div>
{:else}
<div class="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 to-black">
  <div class="w-full max-w-md p-8 bg-gray-800 rounded-2xl shadow-2xl border border-gray-700">
    <div class="text-center mb-8">
      <div class="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
        <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
        </svg>
      </div>
      <h1 class="text-3xl font-bold text-white mb-2">AI Newscaster</h1>
      <p class="text-gray-400">Connect your X account to get personalized news delivered via phone call</p>
    </div>

    <div class="space-y-6">
      <div>
        <label for="phone" class="block text-sm font-medium text-gray-300 mb-2">Your Phone Number</label>
        <input
          id="phone"
          type="tel"
          bind:value={phoneNumber}
          oninput={formatPhone}
          placeholder="+1 555 123 4567"
          class="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
        />
        <p class="text-xs text-gray-500 mt-2">We'll use this to identify you when you call our service</p>
      </div>

      <button
        onclick={connectX}
        disabled={isLoading}
        class="w-full flex items-center justify-center gap-2 px-4 py-3 bg-white text-black font-semibold rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800 transition disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {#if isLoading}
          <svg class="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          Connecting...
        {:else}
          <svg class="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
          </svg>
          Connect with X
        {/if}
      </button>
    </div>

    <div class="mt-8 pt-6 border-t border-gray-700">
      <h3 class="text-sm font-medium text-gray-300 mb-3">What you'll get:</h3>
      <ul class="space-y-2 text-sm text-gray-400">
        <li class="flex items-center gap-2">
          <svg class="w-4 h-4 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
          </svg>
          Personalized news from your following
        </li>
        <li class="flex items-center gap-2">
          <svg class="w-4 h-4 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
          </svg>
          Send DMs via voice command
        </li>
        <li class="flex items-center gap-2">
          <svg class="w-4 h-4 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
          </svg>
          Post tweets hands-free
        </li>
      </ul>
    </div>
  </div>
</div>
{/if}
