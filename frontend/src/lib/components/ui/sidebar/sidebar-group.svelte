<script lang="ts">
  import { cn } from '$lib/utils';

  let { class: className, children, ...restProps }: {
    class?: string;
    children?: import('svelte').Snippet;
  } = $props();
</script>

<div
  class={cn("px-3 py-2", className)}
  {...restProps}
>
  {@render children?.()}
</div>
