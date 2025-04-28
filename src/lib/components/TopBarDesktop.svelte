<script lang="ts">
  import Adjustments from "$lib/icons/Adjustments.svelte";
  import Bookmarks from "$lib/icons/Bookmarks.svelte";
  import ChevronLeft from "$lib/icons/ChevronLeft.svelte";
  import ChevronRight from "$lib/icons/ChevronRight.svelte";
  import Reload from "$lib/icons/Reload.svelte";
  import { state } from "$lib/state.svelte";
  import { formatInputUrl } from "$lib/utils";

  import Button from "./Button.svelte";
  import CompactBlock from "./CompactBlock.svelte";
  import ThinBlock from "./ThinBlock.svelte";

  let iEl: HTMLInputElement;

  let input = formatInputUrl(state.top_bar_input);
  let currentInput = "";
</script>

<div class="top-bar-desktop">
  <CompactBlock className="navigation-buttons-desktop">
    <Button>
      <ChevronLeft />
    </Button>
    <Button>
      <ChevronRight />
    </Button>
    <Button>
      <Reload />
    </Button>
  </CompactBlock>

  <ThinBlock className="top-bar-input">
    <Button className="top-bar-input-button-desktop">
      <Adjustments />
    </Button>
    <input
      type="text"
      placeholder="Search or enter URL"
      class="top-bar-search-input-desktop"
      bind:this={iEl}
      bind:value={input}
      on:keypress={(e) => {
        if (e.key === "Enter") {
          // updateAndLoadInput(currentInput);
          iEl.blur();
        }
      }}
      on:focus={() => {
        input = currentInput || state.top_bar_input;

        setTimeout(() => {
          iEl.select();
          iEl.scrollLeft = iEl.scrollWidth;
        }, 1);
      }}
      on:focusout={() => {
        if (input) currentInput = input;
        else currentInput = state.top_bar_input;

        input = formatInputUrl(state.top_bar_input);
      }}
    />
    <Button className="top-bar-input-button-desktop">
      <Bookmarks />
    </Button>
  </ThinBlock>
</div>
