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

  const slide_duration = 300;
  const fade_duration = 250;
  const flip_duration = 150;

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

<section transition:fade={{ duration: fade_duration }}>
  <div
    class="sidebar"
    use:dndzone={{
      items: vigi.tabs,
      flipDurationMs: flip_duration,
      dropTargetStyle: {},
      morphDisabled: true,
    }}
    onconsider={handleConsider}
    onfinalize={handleFinalize}
    onscrollend={() => {
      temporal.sidebar_scroll = el.scrollTop;
    }}
    bind:this={el}
    transition:slide={{ axis: "x", duration: slide_duration }}
  >
    {#each vigi.tabs as tab, idx (tab.id)}
      {@const currentLink = tab.links[tab.current_link]}
      <section
        transition:fade={{ duration: fade_duration / 2 }}
        animate:flip={{ duration: flip_duration }}
      >
        <div
          class="tab-container"
          transition:slide={{ duration: slide_duration / 2 }}
        >
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
                <WorldX width="20" />
              {:else if tab.links[tab.current_link].loading}
                <Loading width="20" />
              {:else if currentLink.ty === "RENDER" && currentLink.body}
                <World width="20" />
              {:else if currentLink.ty === "RENDER" && !currentLink.body}
                <WorldQuestion width="20" />
              {:else}
                <WorldCog width="20" />
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
      </section>
    {/each}
  </div>
</section>
