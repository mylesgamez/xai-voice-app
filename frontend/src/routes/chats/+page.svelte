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
  <div class="max-w-3xl mx-auto px-6 py-8">
    <!-- Page Header -->
    <div class="flex items-center justify-between mb-6">
      <div>
        <h1 class="text-2xl font-bold">Conversations</h1>
        <p class="text-sm text-muted-foreground">Briefings saved from your calls</p>
      </div>
      <a
        href="tel:+16282003655"
        class="inline-flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-full text-sm font-medium hover:bg-primary/90 transition"
      >
        <span>📞</span> Call now: +1 (628) 200-3655
      </a>
    </div>

    {#if !data.phoneNumber}
      <!-- No phone number connected -->
      <Card.Root class="rounded-2xl border-dashed border-2 border-slate-200">
        <Card.Content class="py-12 text-center">
          <div class="w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <span class="text-2xl">📱</span>
          </div>
          <p class="text-muted-foreground mb-1">Phone number required</p>
          <p class="text-sm text-muted-foreground mb-4">Connect your phone number to start using AI Newscaster</p>
          <Button href="/profile" class="rounded-full">Go to Setup</Button>
        </Card.Content>
      </Card.Root>
    {:else if data.conversations.length === 0}
      <!-- No conversations empty state -->
      <Card.Root class="rounded-2xl border-dashed border-2 border-slate-200">
        <Card.Content class="py-12 text-center">
          <div class="w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <span class="text-2xl">🎙️</span>
          </div>
          <p class="text-muted-foreground mb-1">No conversations yet</p>
          <p class="text-sm text-muted-foreground mb-4">Call AI Newscaster to see your briefings here</p>
          <a
            href="tel:+16282003655"
            class="inline-flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-full text-sm font-medium"
          >
            <span>📞</span> +1 (628) 200-3655
          </a>
        </Card.Content>
      </Card.Root>
    {:else}
      <!-- Conversation list -->
      <div class="space-y-3">
        {#each data.conversations as conversation}
          <Card.Root
            class="cursor-pointer rounded-2xl border-slate-200 shadow-sm hover:shadow-md hover:-translate-y-px transition-all duration-200"
            onclick={() => goto(`/chats/${conversation.id}`)}
          >
            <Card.Header class="pb-2">
              <div class="flex items-start justify-between gap-4">
                <div class="flex items-center gap-2 min-w-0">
                  <span class="text-lg flex-shrink-0">🛰️</span>
                  <Card.Title class="text-base font-semibold truncate">{conversation.title}</Card.Title>
                </div>
                <span class="text-xs text-muted-foreground whitespace-nowrap">
                  {formatDate(conversation.started_at)}
                </span>
              </div>
              <div class="flex items-center gap-2 mt-1 ml-7">
                <span class="text-xs text-muted-foreground">
                  {conversation.message_count} message{conversation.message_count !== 1 ? 's' : ''}
                </span>
                <span class="text-xs text-muted-foreground">·</span>
                {#if conversation.ended_at}
                  <span class="text-xs text-green-600 font-medium">Completed</span>
                {:else}
                  <span class="text-xs text-yellow-600 font-medium">In progress</span>
                {/if}
              </div>
            </Card.Header>
            <Card.Content class="pt-0 space-y-2 ml-7">
              <!-- Topic tags -->
              {#if conversation.tags && conversation.tags.length > 0}
                <div class="flex gap-1.5">
                  {#each conversation.tags as tag}
                    <span class="px-2 py-0.5 bg-slate-100 text-slate-600 rounded-full text-xs font-medium">{tag}</span>
                  {/each}
                </div>
              {/if}
              <!-- Last message preview -->
              {#if conversation.last_message}
                <p class="text-sm text-muted-foreground line-clamp-1">
                  <span class="font-medium">
                    {conversation.last_message.role === 'assistant' ? 'AI' : 'You'}:
                  </span>
                  {truncate(conversation.last_message.content, 80)}
                </p>
              {/if}
            </Card.Content>
          </Card.Root>
        {/each}
      </div>
    {/if}
  </div>
</div>
