<script lang="ts" module>
  import { setContext, getContext } from 'svelte';

  const SIDEBAR_CONTEXT_KEY = 'sidebar';

  export interface SidebarState {
    isOpen: boolean;
    isMobile: boolean;
    toggle: () => void;
  }

  export function setSidebarContext(state: SidebarState) {
    setContext(SIDEBAR_CONTEXT_KEY, state);
  }

  export function getSidebarContext(): SidebarState {
    return getContext(SIDEBAR_CONTEXT_KEY);
  }
</script>

<script lang="ts">
  import { SIDEBAR_WIDTH, SIDEBAR_WIDTH_MOBILE } from './constants';

  let { children }: { children?: import('svelte').Snippet } = $props();

  let isOpen = $state(true);
  let isMobile = $state(false);

  function toggle() {
    isOpen = !isOpen;
  }

  // Check for mobile on mount
  $effect(() => {
    if (typeof window !== 'undefined') {
      const checkMobile = () => {
        isMobile = window.innerWidth < 768;
        if (isMobile) isOpen = false;
      };
      checkMobile();
      window.addEventListener('resize', checkMobile);
      return () => window.removeEventListener('resize', checkMobile);
    }
  });

  setSidebarContext({
    get isOpen() { return isOpen; },
    get isMobile() { return isMobile; },
    toggle
  });
</script>

<div
  class="flex min-h-screen w-full"
  style="--sidebar-width: {SIDEBAR_WIDTH}; --sidebar-width-mobile: {SIDEBAR_WIDTH_MOBILE};"
>
  {@render children?.()}
</div>
