<script lang="ts">
  import { goto } from '$app/navigation';
  import { Button } from '$lib/components/ui/button';
  import { Input } from '$lib/components/ui/input';
  import { sendMessage, getConversation, type Message } from '$lib/api';

  let { data } = $props();

  // Use $derived for initial state from data, then allow local mutations
  let messages = $state<Message[]>([]);
  let newMessage = $state('');
  let sending = $state(false);
  let messagesContainer: HTMLDivElement;

  // Polling state for live updates
  let pollInterval: ReturnType<typeof setInterval> | undefined;
  let isPolling = $state(false);

  // Determine if call is active (not ended)
  let isCallActive = $derived(data.conversation && !data.conversation.ended_at);

  // Initialize messages when data changes
  $effect(() => {
    if (data.conversation?.messages) {
      messages = [...data.conversation.messages];
    }
  });

  // Poll for new messages while call is active
  $effect(() => {
    // Clean up any existing interval
    if (pollInterval) {
      clearInterval(pollInterval);
      pollInterval = undefined;
    }

    // Only poll if call is active
    if (!isCallActive || !data.conversation || !data.phoneNumber) {
      isPolling = false;
      return;
    }

    isPolling = true;

    const poll = async () => {
      try {
        const updated = await getConversation(data.conversation!.id, data.phoneNumber!);

        // Update messages if there are new ones
        if (updated.messages.length > messages.length) {
          messages = updated.messages;
          // Auto-scroll to bottom
          setTimeout(scrollToBottom, 50);
        }

        // Check if call ended
        if (updated.ended_at) {
          // Call ended, stop polling
          if (pollInterval) {
            clearInterval(pollInterval);
            pollInterval = undefined;
          }
          isPolling = false;
          // Update conversation state to reflect ended status
          data = { ...data, conversation: updated };
        }
      } catch (e) {
        console.error('Failed to poll messages:', e);
      }
    };

    // Poll every 2 seconds
    pollInterval = setInterval(poll, 2000);

    // Initial poll
    poll();

    // Cleanup on unmount
    return () => {
      if (pollInterval) {
        clearInterval(pollInterval);
        pollInterval = undefined;
      }
    };
  });

  function formatTime(isoString: string): string {
    const date = new Date(isoString);
    return date.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });
  }

  function scrollToBottom() {
    if (messagesContainer) {
      messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }
  }

  async function handleSend(e: Event) {
    e.preventDefault();
    if (!newMessage.trim() || sending || !data.conversation) return;

    const content = newMessage.trim();
    newMessage = '';
    sending = true;

    try {
      const response = await sendMessage(data.conversation.id, content);

      // Add user message
      messages = [...messages, response.user_message];

      // Add assistant message if available
      if (response.assistant_message) {
        messages = [...messages, response.assistant_message];
      }

      // Scroll to bottom after DOM update
      setTimeout(scrollToBottom, 50);
    } catch (error) {
      console.error('Failed to send message:', error);
      // Restore the message if sending failed
      newMessage = content;
    } finally {
      sending = false;
    }
  }

</script>

<div class="flex h-screen flex-col bg-slate-50">
  <!-- Enhanced Sticky Header -->
  <header class="sticky top-0 z-10 bg-background/95 backdrop-blur border-b px-6 py-4">
    <div class="max-w-3xl mx-auto flex items-center gap-4">
      <Button variant="ghost" size="icon" onclick={() => goto('/chats')} class="rounded-full">
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m15 18-6-6 6-6"/></svg>
      </Button>
      <div class="flex-1 min-w-0">
        <h1 class="font-semibold truncate">{data.conversation?.title || 'Conversation'}</h1>
        {#if data.conversation}
          <p class="text-xs text-muted-foreground">
            {messages.length} message{messages.length !== 1 ? 's' : ''} ·
            {#if isPolling}
              <span class="text-green-600 font-medium">● Live</span>
            {:else if data.conversation.ended_at}
              Completed
            {:else}
              In progress
            {/if}
          </p>
        {/if}
      </div>
    </div>
  </header>

  <!-- Messages Area with Tinted Background -->
  <main class="flex-1 overflow-y-auto" bind:this={messagesContainer}>
    <div class="max-w-3xl mx-auto px-6 py-6">
      <!-- Narrower message container for readability -->
      <div class="max-w-2xl mx-auto space-y-4">
        {#if !data.conversation}
          <div class="py-12 text-center">
            <div class="w-12 h-12 bg-slate-200 rounded-full flex items-center justify-center mx-auto mb-4">
              <span class="text-2xl">?</span>
            </div>
            <p class="text-muted-foreground mb-1">Conversation not found</p>
            <p class="text-sm text-muted-foreground mb-4">This conversation may have been deleted</p>
            <Button href="/chats" class="rounded-full">Back to Chats</Button>
          </div>
        {:else if messages.length === 0}
          <div class="py-12 text-center">
            <div class="w-12 h-12 bg-slate-200 rounded-full flex items-center justify-center mx-auto mb-4">
              {#if isPolling}
                <span class="text-2xl animate-pulse">📞</span>
              {:else}
                <span class="text-2xl">💬</span>
              {/if}
            </div>
            <p class="text-muted-foreground mb-1">
              {#if isPolling}
                Waiting for call to start...
              {:else}
                No messages yet
              {/if}
            </p>
            <p class="text-sm text-muted-foreground">
              {#if isPolling}
                Transcripts will appear here as you speak
              {:else}
                Start the conversation below
              {/if}
            </p>
          </div>
        {:else}
          {#each messages as message (message.id)}
            <div
              class="flex {message.role === 'user' ? 'justify-end' : 'justify-start'}"
            >
              <div
                class="max-w-[80%] rounded-2xl px-4 py-3 shadow-sm {message.role === 'user'
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-white border border-slate-200'}"
              >
                <p class="whitespace-pre-wrap text-sm leading-relaxed">{message.content}</p>
                <div
                  class="mt-2 flex items-center gap-1.5 text-xs {message.role === 'user'
                    ? 'text-primary-foreground/70'
                    : 'text-muted-foreground'}"
                >
                  <span>{formatTime(message.created_at)}</span>
                  {#if message.source === 'voice'}
                    <span title="Voice message">🎤</span>
                  {:else}
                    <span title="Text message">💬</span>
                  {/if}
                </div>
              </div>
            </div>
          {/each}
        {/if}
      </div>
    </div>
  </main>

  <!-- Input Area -->
  {#if data.conversation}
    <div class="border-t bg-background px-6 py-4">
      <form onsubmit={handleSend} class="max-w-3xl mx-auto">
        <div class="max-w-2xl mx-auto flex gap-3">
          <Input
            bind:value={newMessage}
            placeholder="Continue the conversation..."
            disabled={sending}
            class="flex-1 rounded-full px-4"
          />
          <Button type="submit" disabled={!newMessage.trim() || sending} class="rounded-full px-6">
            {#if sending}
              <svg class="h-4 w-4 animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            {:else}
              Send
            {/if}
          </Button>
        </div>
      </form>
    </div>
  {/if}
</div>
