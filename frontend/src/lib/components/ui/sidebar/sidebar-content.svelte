<script lang="ts">
  import { cn } from '$lib/utils';

  let { class: className, children, ...restProps }: {
    class?: string;
    children?: import('svelte').Snippet;
  } = $props();
</script>

<div
  class={cn("flex-1 overflow-auto py-2", className)}
  {...restProps}
>
  {@render children?.()}
</div>
