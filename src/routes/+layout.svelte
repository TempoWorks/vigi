<script lang="ts">
  import Tab from "$lib/components/Tab.svelte";
  import TopBarDesktop from "$lib/components/TopBarDesktop.svelte";
  import { state } from "$lib/state.svelte";
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
    if (e.code === "KeyQ") state.sidebar_open = !state.sidebar_open;
  });
</script>

<div class="grid grid-cols-6 gap-2 w-full">
  <div class="tabs">
    {#each state.tabs as tab}
      <Tab {tab} />
    {/each}
  </div>
  <div class="main-window-desktop">
    <TopBarDesktop />
    <div class="browser">
      {@render children()}
    </div>
  </div>
</div>
