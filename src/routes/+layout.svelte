<script lang="ts">
  import Tab from "$lib/components/Tab.svelte";
  import TopBarDesktop from "$lib/components/TopBarDesktop.svelte";
  import TopBarMobile from "$lib/components/TopBarMobile.svelte";
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

  let width: number = $state(0);

  let is_desktop = $derived(width >= 1024);
  let sidebar_open = $derived(is_desktop && vigiState.sidebar_open);
</script>

<svelte:window bind:innerWidth={width} />

<div class="grid gap-2 w-full" class:grid-cols-6={sidebar_open}>
  {#if sidebar_open}
    <div class="tabs">
      {#each vigiState.tabs as tab}
        <Tab {tab} />
      {/each}
    </div>
  {/if}
  <div class="main-window">
    {#if is_desktop}
      <TopBarDesktop />
    {:else}
      <TopBarMobile />
    {/if}
    <div class="browser">
      {@render children()}
    </div>
  </div>
</div>
