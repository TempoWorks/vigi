<script lang="ts">
  import Adjustments from "$lib/icons/Adjustments.svelte";
  import Bookmarks from "$lib/icons/Bookmarks.svelte";
  import ChevronLeft from "$lib/icons/ChevronLeft.svelte";
  import ChevronRight from "$lib/icons/ChevronRight.svelte";
  import Reload from "$lib/icons/Reload.svelte";
  import Button from "./Button.svelte";
  import CompactBlock from "./CompactBlock.svelte";
  import ThinBlock from "./ThinBlock.svelte";

  import { goto, invalidateAll, onNavigate } from "$app/navigation";
  import {
    currentTabInnerURN,
    currentTabLink,
    formatInputLink,
    gotoTBI,
    linkToURI,
  } from "$lib/utils";
  import { internalState, vigiState } from "$lib/state.svelte";
  import CloseSidebar from "$lib/icons/CloseSidebar.svelte";
  import OpenSidebar from "$lib/icons/OpenSidebar.svelte";

  let iEl: HTMLInputElement;

  let input = $state(formatInputLink(currentTabLink()));
  let currentInput = $state("");

  onNavigate(() => {
    input = formatInputLink(currentTabLink());
    currentInput = "";
  });
</script>

<div class="top-bar-desktop">
  <CompactBlock className="navigation-buttons-desktop">
    <Button
      onclick={() => {
        vigiState.sidebar_open = !vigiState.sidebar_open;
      }}
    >
      {#if vigiState.sidebar_open}
        <CloseSidebar />
      {:else}
        <OpenSidebar />
      {/if}
    </Button>
    <Button
      disabled={vigiState.tabs[vigiState.currentTab].currentLink === 0}
      onclick={() => {
        vigiState.tabs[vigiState.currentTab].currentLink -= 1;
        goto(currentTabInnerURN());
      }}
    >
      <ChevronLeft />
    </Button>
    <Button
      disabled={vigiState.tabs[vigiState.currentTab].currentLink >=
        vigiState.tabs[vigiState.currentTab].links.length - 1}
      onclick={() => {
        vigiState.tabs[vigiState.currentTab].currentLink += 1;
        goto(currentTabInnerURN());
      }}
    >
      <ChevronRight />
    </Button>
    <Button
      onclick={() => {
        vigiState.tabs[vigiState.currentTab].links[
          vigiState.tabs[vigiState.currentTab].currentLink
        ].page = undefined;
        invalidateAll();
      }}
      disabled={internalState.isLoading}
    >
      <Reload class={internalState.isLoading ? "loading" : ""} />
    </Button>
  </CompactBlock>

  <ThinBlock className="top-bar-input">
    <Button className="top-bar-input-button-desktop" disabled>
      <Adjustments />
    </Button>
    <input
      type="text"
      placeholder="Search or enter URL"
      class="top-bar-search-input-desktop"
      bind:this={iEl}
      bind:value={input}
      onkeypress={(e) => {
        if (e.key === "Enter") {
          gotoTBI(input);
          iEl.blur();
        }
      }}
      onfocus={() => {
        input = currentInput || linkToURI(currentTabLink());

        setTimeout(() => {
          iEl.select();
          iEl.scrollLeft = iEl.scrollWidth;
        }, 1);
      }}
      onfocusout={() => {
        const currLink = currentTabLink();

        if (input) currentInput = input;
        else currentInput = linkToURI(currLink);

        input = formatInputLink(currLink);
      }}
    />
    <Button className="top-bar-input-button-desktop" disabled>
      <Bookmarks />
    </Button>
  </ThinBlock>
</div>
