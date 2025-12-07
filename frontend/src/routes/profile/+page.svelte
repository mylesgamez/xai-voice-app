<script lang="ts">
  import { auth } from '$lib/stores/auth';
  import { Button } from '$lib/components/ui/button';
  import { Input } from '$lib/components/ui/input';
  import * as Card from '$lib/components/ui/card';

  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

  let phoneInput = $state('');

  // Sync phone input with auth store
  $effect(() => {
    if ($auth.phoneNumber && !phoneInput) {
      phoneInput = $auth.phoneNumber;
    }
  });

  function connectX() {
    if (!phoneInput) {
      alert('Please enter your phone number');
      return;
    }
    auth.setPhone(phoneInput);
    window.location.href = `${API_URL}/api/auth/x/start?phone=${encodeURIComponent(phoneInput)}`;
  }

  function disconnectX() {
    auth.disconnect();
    phoneInput = '';
  }

  function formatPhone(e: Event) {
    const input = e.target as HTMLInputElement;
    if (input.value && !input.value.startsWith('+')) {
      phoneInput = '+' + input.value.replace(/[^0-9]/g, '');
    }
  }
</script>

<div class="container max-w-2xl py-8 px-4">
  <h1 class="text-2xl font-bold mb-6">Profile</h1>

  <Card.Root>
    <Card.Header>
      <Card.Title class="text-lg">Phone Number</Card.Title>
      <Card.Description>
        Your phone number is used to identify you when you call the AI Newscaster service.
      </Card.Description>
    </Card.Header>
    <Card.Content>
      <Input
        type="tel"
        bind:value={phoneInput}
        oninput={formatPhone}
        placeholder="+1 555 123 4567"
        disabled={$auth.isConnected}
      />
    </Card.Content>
  </Card.Root>

  <Card.Root class="mt-6">
    <Card.Header>
      <Card.Title class="text-lg">X Account</Card.Title>
      <Card.Description>
        Connect your X account to get personalized news and interact with the platform.
      </Card.Description>
    </Card.Header>
    <Card.Content>
      {#if $auth.loading}
        <p class="text-muted-foreground">Loading...</p>
      {:else if $auth.isConnected}
        <div class="flex items-center justify-between">
          <div class="flex items-center gap-3">
            <div class="flex h-10 w-10 items-center justify-center rounded-full bg-muted">
              <span class="text-sm font-medium">{$auth.xName?.charAt(0) || 'U'}</span>
            </div>
            <div>
              <p class="font-medium">{$auth.xName}</p>
              <p class="text-sm text-muted-foreground">@{$auth.xUsername}</p>
            </div>
          </div>
          <Button variant="destructive" onclick={disconnectX}>
            Disconnect
          </Button>
        </div>
      {:else}
        <Button onclick={connectX} disabled={!phoneInput}>
          <svg class="w-4 h-4 mr-2" viewBox="0 0 24 24" fill="currentColor">
            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
          </svg>
          Connect with X
        </Button>
      {/if}
    </Card.Content>
  </Card.Root>

  {#if $auth.isConnected}
    <Card.Root class="mt-6">
      <Card.Header>
        <Card.Title class="text-lg">Call AI Newscaster</Card.Title>
        <Card.Description>
          Call this number to get personalized news delivered by AI.
        </Card.Description>
      </Card.Header>
      <Card.Content>
        <p class="text-3xl font-bold tracking-wide">+1 (628) 200-3655</p>
        <p class="text-xs text-muted-foreground mt-2">Your Twilio number</p>
      </Card.Content>
    </Card.Root>

    <Card.Root class="mt-6">
      <Card.Header>
        <Card.Title class="text-lg">Try Saying</Card.Title>
      </Card.Header>
      <Card.Content>
        <ul class="space-y-2 text-sm text-muted-foreground">
          <li>"Who do I follow on X?"</li>
          <li>"What are @elonmusk's latest posts?"</li>
          <li>"Send a DM to @friend saying hello"</li>
          <li>"Tweet: Just tried AI Newscaster!"</li>
        </ul>
      </Card.Content>
    </Card.Root>
  {/if}
</div>
