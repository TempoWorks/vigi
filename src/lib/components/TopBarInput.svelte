<script lang="ts">
  import { onNavigate } from "$app/navigation";
  import { temporal } from "$lib/state.svelte";
  import {
    currentTabLink,
    formatInputLink,
    gotoTBI,
    linkToURI,
  } from "$lib/utils";

  let iEl: HTMLInputElement;

  let input = $state(formatInputLink(currentTabLink()));
  let currentInput = $state("");

  onNavigate(() => {
    input = formatInputLink(currentTabLink());
    currentInput = "";
  });
</script>

<input
  type="text"
  placeholder="Search or enter URL"
  class="top-bar-search-input"
  bind:this={iEl}
  bind:value={input}
  onkeypress={(e) => {
    if (e.key === "Enter") {
      gotoTBI(input);
      iEl.blur();

      temporal.topBarOpen = false;
    }
  }}
  onfocus={() => {
    input = currentInput || linkToURI(currentTabLink());

    setTimeout(() => {
      iEl.select();
      iEl.scrollLeft = iEl.scrollWidth;

      temporal.topBarOpen = true;
    }, 1);
  }}
  onfocusout={() => {
    const currLink = currentTabLink();

    if (input) currentInput = input;
    else currentInput = linkToURI(currLink);

    input = formatInputLink(currLink);

    temporal.topBarOpen = false;
  }}
/>
