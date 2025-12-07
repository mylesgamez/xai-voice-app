<script lang="ts">
  import '../app.css';
  import { auth } from '$lib/stores/auth';
  import { onMount } from 'svelte';
  import { page } from '$app/stores';
  import * as Sidebar from '$lib/components/ui/sidebar';

  let { children } = $props();

  // Public routes that don't show sidebar
  const publicRoutes = ['/', '/dashboard'];
  let isPublicRoute = $derived(publicRoutes.includes($page.url.pathname));

  onMount(() => {
    auth.init();
  });
</script>

{#if isPublicRoute}
  {@render children()}
{:else}
  <Sidebar.Provider>
    <Sidebar.Root>
      <Sidebar.Header>
        <div class="flex items-center gap-2">
          <div class="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
            </svg>
          </div>
          <span class="font-semibold">AI Newscaster</span>
        </div>
      </Sidebar.Header>
      <Sidebar.Content>
        <Sidebar.Group>
          <Sidebar.Menu>
            <Sidebar.MenuItem>
              <Sidebar.MenuButton href="/chats" isActive={$page.url.pathname.startsWith('/chats')}>
                <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
                Chats
              </Sidebar.MenuButton>
            </Sidebar.MenuItem>
            <Sidebar.MenuItem>
              <Sidebar.MenuButton href="/profile" isActive={$page.url.pathname === '/profile'}>
                <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                Profile
              </Sidebar.MenuButton>
            </Sidebar.MenuItem>
          </Sidebar.Menu>
        </Sidebar.Group>
      </Sidebar.Content>
      <Sidebar.Footer>
        {#if $auth.isConnected}
          <div class="flex items-center gap-2">
            <div class="flex h-8 w-8 items-center justify-center rounded-full bg-muted">
              <span class="text-xs font-medium">{$auth.xName?.charAt(0) || 'U'}</span>
            </div>
            <div class="flex flex-col">
              <span class="text-sm font-medium">{$auth.xName}</span>
              <span class="text-xs text-muted-foreground">@{$auth.xUsername}</span>
            </div>
          </div>
        {:else if !$auth.loading}
          <a href="/profile" class="text-sm text-muted-foreground hover:text-foreground">
            Connect X account
          </a>
        {/if}
      </Sidebar.Footer>
    </Sidebar.Root>
    <main class="flex-1 overflow-auto">
      <div class="md:hidden fixed top-0 left-0 z-30 p-2">
        <Sidebar.Trigger />
      </div>
      {@render children()}
    </main>
  </Sidebar.Provider>
{/if}
