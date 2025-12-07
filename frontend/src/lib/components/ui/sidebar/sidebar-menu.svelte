<script lang="ts">
  import { cn } from '$lib/utils';

  let { class: className, children, ...restProps }: {
    class?: string;
    children?: import('svelte').Snippet;
  } = $props();
</script>

<ul
  class={cn("flex w-full flex-col gap-1", className)}
  {...restProps}
>
  {@render children?.()}
</ul>
