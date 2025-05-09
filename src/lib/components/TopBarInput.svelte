<script lang="ts">
  import { onNavigate } from "$app/navigation";
  import { temporal } from "$lib/state.svelte";
  import { currentLink, formatInputLink, gotoTBI, linkToURI } from "$lib/utils";

  let iEl: HTMLInputElement;

  let input = $state(formatInputLink(currentLink()));
  let currentInput = $state("");

  onNavigate(() => {
    input = formatInputLink(currentLink());
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

      temporal.top_bar_open = false;
    }
  }}
  onfocus={() => {
    input = currentInput || linkToURI(currentLink());

    setTimeout(() => {
      iEl.select();
      iEl.scrollLeft = iEl.scrollWidth;

      temporal.top_bar_open = true;
    }, 1);
  }}
  onfocusout={() => {
    if (input) currentInput = input;
    else currentInput = "";

    input = formatInputLink(currentLink());

    temporal.top_bar_open = false;
  }}
/>
