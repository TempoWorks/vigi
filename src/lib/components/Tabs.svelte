<script lang="ts">
  import { internalState, vigiState } from "$lib/state.svelte";
  import { dndzone, type DndEvent } from "svelte-dnd-action";
  import { flip } from "svelte/animate";
  import { closeTab, goToTab } from "$lib/utils";
  import type { SiteTab } from "$lib/types";
  import Loading from "$lib/icons/Loading.svelte";
  import World from "$lib/icons/World.svelte";
  import WorldCog from "$lib/icons/WorldCog.svelte";
  import Button from "./Button.svelte";
  import X from "$lib/icons/X.svelte";

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
    {@const currentLink = tab.links[tab.currentLink]}
    <div class="tab-container" animate:flip={{ duration: 150 }}>
      <button
        class="tab"
        class:selected={!dragging && vigiState.currentTab === idx}
        onclick={() => goToTab(idx)}
      >
        <div>
          {#if vigiState.currentTab === idx && internalState.isLoading}
            <Loading />
          {:else if currentLink.type === "render"}
            <World />
          {:else}
            <WorldCog />
          {/if}
        </div>
        <div class="tab-text">
          {currentLink.title || "No title"}
        </div>
      </button>
      <Button
        className="tab-close"
        onclick={() => {
          closeTab(idx);
        }}><X /></Button
      >
    </div>
  {/each}
</div>
