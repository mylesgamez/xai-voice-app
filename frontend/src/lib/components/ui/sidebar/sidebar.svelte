<script lang="ts">
  import { cn } from '$lib/utils';
  import { getSidebarContext } from './sidebar-provider.svelte';

  let { class: className, children, ...restProps }: {
    class?: string;
    children?: import('svelte').Snippet;
  } = $props();

  const sidebar = getSidebarContext();
</script>

{#if sidebar.isMobile}
  <!-- Mobile: Overlay sidebar -->
  {#if sidebar.isOpen}
    <div
      class="fixed inset-0 z-40 bg-black/50"
      onclick={sidebar.toggle}
      role="button"
      tabindex="-1"
      onkeydown={(e) => e.key === 'Escape' && sidebar.toggle()}
    ></div>
    <aside
      class={cn(
        "fixed inset-y-0 left-0 z-50 flex w-[var(--sidebar-width-mobile)] flex-col border-r bg-background",
        className
      )}
      {...restProps}
    >
      {@render children?.()}
    </aside>
  {/if}
{:else}
  <!-- Desktop: Static sidebar -->
  <aside
    class={cn(
      "flex h-screen w-[var(--sidebar-width)] flex-col border-r bg-background transition-all duration-300",
      !sidebar.isOpen && "w-0 overflow-hidden border-r-0",
      className
    )}
    {...restProps}
  >
    {@render children?.()}
  </aside>
{/if}
