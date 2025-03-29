<script lang="ts">
  import Tab from "$lib/components/Tab.svelte";
  import { state } from "$lib/state.svelte";
  import "../app.css";

  let sidebarOpen = true;

  document.addEventListener("keypress", (e: KeyboardEvent) => {
    if (
      ["INPUT", "TEXTAREA", "SELECT", "OPTION"].includes(
        (e.target as Element).tagName
      )
    ) {
      return;
    }
    if (e.code === "KeyQ") sidebarOpen = !sidebarOpen;
  });
</script>

<div class="grid grid-cols-6 gap-2">
  <div class="col-span-1 flex flex-col h-full">
    {#each state.tabs as tab}
      <Tab {tab} />
    {/each}
  </div>
  <div class="browser col-span-5">
    <slot />
  </div>
</div>
