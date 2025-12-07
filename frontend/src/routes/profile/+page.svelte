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

<div class="min-h-screen bg-background">
  <div class="max-w-4xl mx-auto px-6 py-8">
    <h1 class="text-2xl font-bold mb-6">Setup</h1>

    <div class="grid md:grid-cols-2 gap-6">
      <!-- Left Column: Phone + X Account -->
      <div class="space-y-6">
        <!-- Phone Number Card -->
        <Card.Root class="rounded-2xl border-slate-200">
          <Card.Header>
            <div class="flex items-center gap-2">
              <span class="text-lg">📱</span>
              <Card.Title class="text-base font-semibold">Phone Number</Card.Title>
            </div>
            <Card.Description>
              Used to identify you when calling AI Newscaster
            </Card.Description>
          </Card.Header>
          <Card.Content>
            <Input
              type="tel"
              bind:value={phoneInput}
              oninput={formatPhone}
              placeholder="+1 555 123 4567"
              disabled={$auth.isConnected}
              class="rounded-lg"
            />
          </Card.Content>
        </Card.Root>

        <!-- X Account Card -->
        <Card.Root class="rounded-2xl border-slate-200">
          <Card.Header>
            <div class="flex items-center gap-2">
              <svg class="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
              </svg>
              <Card.Title class="text-base font-semibold">X Account</Card.Title>
            </div>
            <Card.Description>
              Connect to get personalized news and interact with X
            </Card.Description>
          </Card.Header>
          <Card.Content>
            {#if $auth.loading}
              <p class="text-muted-foreground">Loading...</p>
            {:else if $auth.isConnected}
              <div class="flex items-center justify-between">
                <div class="flex items-center gap-3">
                  <div class="flex h-10 w-10 items-center justify-center rounded-full bg-slate-100">
                    <span class="text-sm font-medium text-slate-700">{$auth.xName?.charAt(0) || 'U'}</span>
                  </div>
                  <div>
                    <p class="font-medium">{$auth.xName}</p>
                    <p class="text-sm text-muted-foreground">@{$auth.xUsername}</p>
                  </div>
                </div>
                <Button variant="outline" size="sm" onclick={disconnectX} class="rounded-full text-red-600 hover:text-red-700 hover:bg-red-50 border-red-200">
                  Disconnect
                </Button>
              </div>
            {:else}
              <Button onclick={connectX} disabled={!phoneInput} class="rounded-full">
                <svg class="w-4 h-4 mr-2" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
                Connect with X
              </Button>
            {/if}
          </Card.Content>
        </Card.Root>
      </div>

      <!-- Right Column: Call CTA + Try Saying -->
      <div class="space-y-6">
        <!-- Big Call Card -->
        <Card.Root class="rounded-2xl bg-gradient-to-br from-blue-500 to-blue-600 text-white border-0 shadow-lg">
          <Card.Header>
            <div class="flex items-center gap-2">
              <span class="text-lg">📞</span>
              <Card.Title class="text-white text-base font-semibold">Call AI Newscaster</Card.Title>
            </div>
            <Card.Description class="text-blue-100">
              Get personalized news delivered by AI voice
            </Card.Description>
          </Card.Header>
          <Card.Content class="pt-2">
            <p class="text-3xl font-bold tracking-wide mb-4">+1 (628) 200-3655</p>
            <a
              href="tel:+16282003655"
              class="inline-flex items-center gap-2 px-5 py-2.5 bg-white text-blue-600 rounded-full font-medium hover:bg-blue-50 transition-colors"
            >
              <span>📞</span> Call from phone
            </a>
          </Card.Content>
        </Card.Root>

        <!-- Try Saying Card -->
        <Card.Root class="rounded-2xl border-slate-200">
          <Card.Header>
            <div class="flex items-center gap-2">
              <span class="text-lg">💬</span>
              <Card.Title class="text-base font-semibold">Try Saying</Card.Title>
            </div>
          </Card.Header>
          <Card.Content>
            <ul class="space-y-3">
              <li class="flex items-start gap-3 text-sm">
                <span class="text-blue-500 mt-0.5">💬</span>
                <span class="text-muted-foreground">"Who do I follow on X?"</span>
              </li>
              <li class="flex items-start gap-3 text-sm">
                <span class="text-blue-500 mt-0.5">💬</span>
                <span class="text-muted-foreground">"What are @elonmusk's latest posts?"</span>
              </li>
              <li class="flex items-start gap-3 text-sm">
                <span class="text-blue-500 mt-0.5">💬</span>
                <span class="text-muted-foreground">"Send a DM to @friend saying hello"</span>
              </li>
              <li class="flex items-start gap-3 text-sm">
                <span class="text-blue-500 mt-0.5">💬</span>
                <span class="text-muted-foreground">"Tweet: Just tried AI Newscaster!"</span>
              </li>
            </ul>
          </Card.Content>
        </Card.Root>
      </div>
    </div>
  </div>
</div>
