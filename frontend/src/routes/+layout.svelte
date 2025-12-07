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
    <Sidebar.Root class="bg-slate-50 border-r border-slate-200">
      <Sidebar.Header class="px-4 py-4">
        <div class="flex items-center gap-3">
          <div class="w-9 h-9 bg-blue-500 rounded-xl flex items-center justify-center shadow-sm">
            <span class="text-white text-lg">📡</span>
          </div>
          <span class="font-semibold text-slate-900">AI Newscaster</span>
        </div>
      </Sidebar.Header>
      <Sidebar.Content class="px-2">
        <Sidebar.Group>
          <Sidebar.Menu>
            <Sidebar.MenuItem>
              <Sidebar.MenuButton
                href="/chats"
                isActive={$page.url.pathname.startsWith('/chats')}
                class="rounded-lg transition-all duration-200 data-[active=true]:bg-slate-900 data-[active=true]:text-white data-[active=true]:shadow-sm hover:bg-slate-100"
              >
                <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
                Chats
              </Sidebar.MenuButton>
            </Sidebar.MenuItem>
            <Sidebar.MenuItem>
              <Sidebar.MenuButton
                href="/profile"
                isActive={$page.url.pathname === '/profile'}
                class="rounded-lg transition-all duration-200 data-[active=true]:bg-slate-900 data-[active=true]:text-white data-[active=true]:shadow-sm hover:bg-slate-100"
              >
                <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                Setup
              </Sidebar.MenuButton>
            </Sidebar.MenuItem>
          </Sidebar.Menu>
        </Sidebar.Group>
      </Sidebar.Content>
      <Sidebar.Footer class="px-4 py-4 border-t border-slate-200">
        {#if $auth.isConnected}
          <div class="flex items-center gap-3">
            <div class="flex h-9 w-9 items-center justify-center rounded-full bg-slate-200">
              <span class="text-sm font-medium text-slate-700">{$auth.xName?.charAt(0) || 'U'}</span>
            </div>
            <div class="flex flex-col min-w-0">
              <span class="text-sm font-medium text-slate-900 truncate">{$auth.xName}</span>
              <span class="text-xs text-muted-foreground truncate">@{$auth.xUsername}</span>
            </div>
          </div>
        {:else if !$auth.loading}
          <a href="/profile" class="flex items-center gap-3 text-sm text-muted-foreground hover:text-foreground transition-colors">
            <div class="flex h-9 w-9 items-center justify-center rounded-full bg-slate-200">
              <svg class="h-4 w-4 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
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
