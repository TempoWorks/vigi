<script lang="ts">
  import Tab from "$lib/components/Tab.svelte";
  import TopBarDesktop from "$lib/components/TopBarDesktop.svelte";
  import { vigiState } from "$lib/state.svelte";
  import "../app.css";

  const { children } = $props();

  document.addEventListener("keypress", (e: KeyboardEvent) => {
    if (
      ["INPUT", "TEXTAREA", "SELECT", "OPTION"].includes(
        (e.target as Element).tagName
      )
    ) {
      return;
    }
    if (e.code === "KeyQ") vigiState.sidebar_open = !vigiState.sidebar_open;
  });
</script>

<div class="grid gap-2 w-full" class:grid-cols-6={vigiState.sidebar_open}>
  {#if vigiState.sidebar_open}
    <div class="tabs">
      {#each vigiState.tabs as tab}
        <Tab {tab} />
      {/each}
    </div>
  {/if}
  <div class="main-window-desktop">
    <TopBarDesktop />
    <div class="browser">
      {@render children()}
    </div>
  </div>
</div>
