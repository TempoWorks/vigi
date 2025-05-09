<script lang="ts">
  import { vigi } from "$lib/state.svelte";
  import { dndzone, type DndEvent } from "svelte-dnd-action";
  import { flip } from "svelte/animate";
  import { closeTab, goToTab } from "$lib/management";
  import type { SiteTab } from "$lib/types";
  import Loading from "$lib/icons/Loading.svelte";
  import World from "$lib/icons/World.svelte";
  import WorldCog from "$lib/icons/WorldCog.svelte";
  import Button from "./Button.svelte";
  import X from "$lib/icons/X.svelte";
  import WorldX from "$lib/icons/WorldX.svelte";
  import { tabIndexById } from "$lib/utils";
  import WorldQuestion from "$lib/icons/WorldQuestion.svelte";

  let dragging = false;

  function handleConsider(e: CustomEvent<DndEvent<SiteTab>>) {
    vigi.tabs = e.detail.items;

    dragging = true;
  }

  function handleFinalize(e: CustomEvent<DndEvent<SiteTab>>) {
    vigi.tabs = e.detail.items;

    goToTab(tabIndexById(parseInt(e.detail.info.id)));

    dragging = false;
  }
</script>

<div
  class="tabs"
  use:dndzone={{
    items: vigi.tabs,
    flipDurationMs: 150,
    dropTargetStyle: {},
    morphDisabled: true,
  }}
  onconsider={handleConsider}
  onfinalize={handleFinalize}
>
  {#each vigi.tabs as tab, idx (tab.id)}
    {@const currentLink = tab.links[tab.current_link]}
    <div class="tab-container" animate:flip={{ duration: 150 }}>
      <button
        class="tab"
        class:selected={!dragging && vigi.current_tab === idx}
        onclick={() => goToTab(idx)}
      >
        <div>
          {#if tab.links[tab.current_link].error}
            <WorldX />
          {:else if tab.links[tab.current_link].loading}
            <Loading />
          {:else if currentLink.ty === "RENDER" && currentLink.body}
            <World />
          {:else if currentLink.ty === "RENDER" && !currentLink.body}
            <WorldQuestion />
          {:else}
            <WorldCog />
          {/if}
        </div>
        <div class="tab-text">
          {currentLink.title || "No title"}
        </div>
      </button>
      <Button
        className="tab-close{!dragging && vigi.current_tab === idx
          ? ' selected'
          : ''}"
        onclick={() => {
          closeTab(idx);
        }}><X /></Button
      >
    </div>
  {/each}
</div>
