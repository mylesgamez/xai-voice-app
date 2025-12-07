<script lang="ts">
  import { cn } from '$lib/utils';
  import { getSidebarContext } from './sidebar-provider.svelte';

  let { class: className, ...restProps }: {
    class?: string;
  } = $props();

  const sidebar = getSidebarContext();
</script>

<button
  type="button"
  onclick={sidebar.toggle}
  class={cn(
    "inline-flex h-10 w-10 items-center justify-center rounded-md hover:bg-accent hover:text-accent-foreground",
    className
  )}
  {...restProps}
>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    stroke-width="2"
    stroke-linecap="round"
    stroke-linejoin="round"
  >
    <line x1="3" y1="12" x2="21" y2="12" />
    <line x1="3" y1="6" x2="21" y2="6" />
    <line x1="3" y1="18" x2="21" y2="18" />
  </svg>
  <span class="sr-only">Toggle sidebar</span>
</button>
