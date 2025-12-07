<script lang="ts">
  import { goto } from '$app/navigation';
  import * as Card from '$lib/components/ui/card';
  import { Button } from '$lib/components/ui/button';
  import type { ConversationSummary } from '$lib/api';

  let { data } = $props();

  function formatDate(isoString: string): string {
    const date = new Date(isoString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffDays < 7) return `${diffDays}d ago`;

    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: date.getFullYear() !== now.getFullYear() ? 'numeric' : undefined
    });
  }

  function truncate(text: string, maxLength: number): string {
    if (text.length <= maxLength) return text;
    return text.slice(0, maxLength) + '...';
  }
</script>

<div class="min-h-screen bg-background">
  <div class="container max-w-2xl py-8 px-4">
    <div class="mb-6">
      <h1 class="text-2xl font-bold">Conversations</h1>
    </div>

    {#if !data.phoneNumber}
      <Card.Root>
        <Card.Content class="py-8 text-center">
          <p class="text-muted-foreground">Please connect your phone number first.</p>
          <Button href="/profile" class="mt-4">Go to Profile</Button>
        </Card.Content>
      </Card.Root>
    {:else if data.conversations.length === 0}
      <Card.Root>
        <Card.Content class="py-8 text-center">
          <p class="text-muted-foreground">No conversations yet. Make a phone call to start!</p>
          <Button href="/profile" class="mt-4">View Profile</Button>
        </Card.Content>
      </Card.Root>
    {:else}
      <div class="space-y-3">
        {#each data.conversations as conversation}
          <Card.Root
            class="cursor-pointer transition-colors hover:bg-accent/50"
            onclick={() => goto(`/chats/${conversation.id}`)}
          >
            <Card.Header class="pb-2">
              <div class="flex items-center justify-between">
                <Card.Title class="text-lg">{conversation.title}</Card.Title>
                <span class="text-sm text-muted-foreground">
                  {formatDate(conversation.started_at)}
                </span>
              </div>
              <Card.Description>
                {conversation.message_count} message{conversation.message_count !== 1 ? 's' : ''}
                {#if conversation.ended_at}
                  <span class="ml-2 text-xs text-green-600">Completed</span>
                {:else}
                  <span class="ml-2 text-xs text-yellow-600">In progress</span>
                {/if}
              </Card.Description>
            </Card.Header>
            {#if conversation.last_message}
              <Card.Content class="pt-0">
                <p class="text-sm text-muted-foreground">
                  <span class="font-medium">
                    {conversation.last_message.role === 'user' ? 'You' : 'AI'}:
                  </span>
                  {truncate(conversation.last_message.content, 100)}
                  {#if conversation.last_message.source === 'voice'}
                    <span class="ml-1" title="Voice message">🎤</span>
                  {:else}
                    <span class="ml-1" title="Text message">💬</span>
                  {/if}
                </p>
              </Card.Content>
            {/if}
          </Card.Root>
        {/each}
      </div>
    {/if}
  </div>
</div>
