<script lang="ts">
  import { cn } from '$lib/utils';

  let {
    class: className,
    href,
    isActive = false,
    children,
    ...restProps
  }: {
    class?: string;
    href?: string;
    isActive?: boolean;
    children?: import('svelte').Snippet;
  } = $props();
</script>

{#if href}
  <a
    {href}
    class={cn(
      "flex w-full items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors",
      "hover:bg-accent hover:text-accent-foreground",
      isActive && "bg-accent text-accent-foreground",
      className
    )}
    {...restProps}
  >
    {@render children?.()}
  </a>
{:else}
  <button
    type="button"
    class={cn(
      "flex w-full items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors",
      "hover:bg-accent hover:text-accent-foreground",
      isActive && "bg-accent text-accent-foreground",
      className
    )}
    {...restProps}
  >
    {@render children?.()}
  </button>
{/if}
