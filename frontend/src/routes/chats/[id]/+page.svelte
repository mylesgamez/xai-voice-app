<script lang="ts">
  import { goto } from '$app/navigation';
  import { Button } from '$lib/components/ui/button';
  import { Input } from '$lib/components/ui/input';
  import { ScrollArea } from '$lib/components/ui/scroll-area';
  import { sendMessage, type Message } from '$lib/api';

  let { data } = $props();

  // Use $derived for initial state from data, then allow local mutations
  let messages = $state<Message[]>([]);
  let newMessage = $state('');
  let sending = $state(false);
  let messagesContainer: HTMLDivElement;

  // Initialize messages when data changes
  $effect(() => {
    if (data.conversation?.messages) {
      messages = [...data.conversation.messages];
    }
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

<div class="flex h-screen flex-col bg-background">
  <!-- Header -->
  <header class="border-b px-4 py-3">
    <div class="container flex max-w-2xl items-center gap-4">
      <Button variant="ghost" size="icon" onclick={() => goto('/chats')}>
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m15 18-6-6 6-6"/></svg>
      </Button>
      <div>
        <h1 class="font-semibold">{data.conversation?.title || 'Conversation'}</h1>
        {#if data.conversation}
          <p class="text-xs text-muted-foreground">
            {new Date(data.conversation.started_at).toLocaleDateString('en-US', {
              weekday: 'short',
              month: 'short',
              day: 'numeric',
              hour: 'numeric',
              minute: '2-digit'
            })}
          </p>
        {/if}
      </div>
    </div>
  </header>

  <!-- Messages -->
  <ScrollArea class="flex-1 overflow-y-auto" bind:this={messagesContainer}>
    <div class="container max-w-2xl space-y-4 px-4 py-4">
      {#if !data.conversation}
        <div class="py-8 text-center text-muted-foreground">
          <p>Conversation not found.</p>
          <Button href="/chats" class="mt-4">Back to Chats</Button>
        </div>
      {:else if messages.length === 0}
        <div class="py-8 text-center text-muted-foreground">
          <p>No messages yet. Start the conversation!</p>
        </div>
      {:else}
        {#each messages as message (message.id)}
          <div
            class="flex {message.role === 'user' ? 'justify-end' : 'justify-start'}"
          >
            <div
              class="max-w-[80%] rounded-lg px-4 py-2 {message.role === 'user'
                ? 'bg-primary text-primary-foreground'
                : 'bg-muted'}"
            >
              <p class="whitespace-pre-wrap">{message.content}</p>
              <div
                class="mt-1 flex items-center gap-1 text-xs {message.role === 'user'
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
  </ScrollArea>

  <!-- Input -->
  {#if data.conversation}
    <div class="border-t p-4">
      <form onsubmit={handleSend} class="container flex max-w-2xl gap-2">
        <Input
          bind:value={newMessage}
          placeholder="Continue the conversation..."
          disabled={sending}
          class="flex-1"
        />
        <Button type="submit" disabled={!newMessage.trim() || sending}>
          {#if sending}
            <svg class="h-4 w-4 animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
          {:else}
            Send
          {/if}
        </Button>
      </form>
    </div>
  {/if}
</div>
