<script lang="ts">
  import { vigiState } from "$lib/state.svelte";
  import { dndzone, type DndEvent } from "svelte-dnd-action";
  import { flip } from "svelte/animate";
  import { goToTab } from "$lib/utils";
  import type { SiteTab } from "$lib/types";

  let dragging = false;

  function handleConsider(e: CustomEvent<DndEvent<SiteTab>>) {
    vigiState.tabs = e.detail.items;

    dragging = true;
  }

  function handleFinalize(e: CustomEvent<DndEvent<SiteTab>>) {
    vigiState.tabs = e.detail.items;

    goToTab(
      vigiState.tabs.findIndex((tab) => tab.id === parseInt(e.detail.info.id))
    );

    dragging = false;
  }
</script>

<div
  class="tabs"
  use:dndzone={{
    items: vigiState.tabs,
    flipDurationMs: 150,
    dropTargetStyle: {},
    morphDisabled: true,
  }}
  onconsider={handleConsider}
  onfinalize={handleFinalize}
>
  {#each vigiState.tabs as tab, idx (tab.id)}
    <button
      class="tab"
      class:selected={!dragging && vigiState.currentTab === idx}
      onclick={() => goToTab(idx)}
      animate:flip={{ duration: 150 }}
    >
      {tab.links[tab.currentLink].title || "No title"}
    </button>
  {/each}
</div>
