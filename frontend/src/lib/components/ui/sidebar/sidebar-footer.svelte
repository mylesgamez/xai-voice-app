<script lang="ts">
  import { cn } from '$lib/utils';

  let { class: className, children, ...restProps }: {
    class?: string;
    children?: import('svelte').Snippet;
  } = $props();
</script>

<div
  class={cn("mt-auto border-t p-4", className)}
  {...restProps}
>
  {@render children?.()}
</div>
