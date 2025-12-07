<script lang="ts">
  import { cn } from '$lib/utils';

  let { class: className, children, ...restProps }: {
    class?: string;
    children?: import('svelte').Snippet;
  } = $props();
</script>

<div
  class={cn("flex h-14 items-center border-b px-4", className)}
  {...restProps}
>
  {@render children?.()}
</div>
