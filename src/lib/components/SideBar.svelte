<script lang="ts">
  import { temporal, vigi } from "$lib/state.svelte";
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
  import { fade, slide } from "svelte/transition";
  import { onMount } from "svelte";

  export let is_desktop: boolean;

  let dragging = false;
  let el: HTMLDivElement;

  function handleConsider(e: CustomEvent<DndEvent<SiteTab>>) {
    vigi.tabs = e.detail.items;

    dragging = true;
  }

  function handleFinalize(e: CustomEvent<DndEvent<SiteTab>>) {
    vigi.tabs = e.detail.items;

    goToTab(tabIndexById(parseInt(e.detail.info.id)));

    dragging = false;
  }

  onMount(() => {
    el.scrollTo({ top: temporal.sidebar_scroll });
  });
</script>

<section transition:fade={{ duration: 250 }}>
  <div
    class="sidebar"
    use:dndzone={{
      items: vigi.tabs,
      flipDurationMs: 150,
      dropTargetStyle: {},
      morphDisabled: true,
    }}
    onconsider={handleConsider}
    onfinalize={handleFinalize}
    onscrollend={() => {
      temporal.sidebar_scroll = el.scrollTop;
    }}
    bind:this={el}
    transition:slide={{ axis: "x", duration: 300 }}
  >
    {#each vigi.tabs as tab, idx (tab.id)}
      {@const currentLink = tab.links[tab.current_link]}
      <div class="tab-container" animate:flip={{ duration: 150 }}>
        <button
          class="tab"
          class:selected={!dragging && vigi.current_tab === idx}
          onclick={() => {
            if (!is_desktop) temporal.sidebar_open = false;
            goToTab(idx);
          }}
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
</section>
