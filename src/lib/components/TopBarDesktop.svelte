<script lang="ts">
  import Adjustments from "$lib/icons/Adjustments.svelte";
  import Bookmarks from "$lib/icons/Bookmarks.svelte";
  import ChevronLeft from "$lib/icons/ChevronLeft.svelte";
  import ChevronRight from "$lib/icons/ChevronRight.svelte";
  import Reload from "$lib/icons/Reload.svelte";
  import { state } from "$lib/state.svelte";

  import Button from "./Button.svelte";
  import CompactBlock from "./CompactBlock.svelte";
  import ThinBlock from "./ThinBlock.svelte";

  let iEl: HTMLInputElement;

  let input = state.top_bar_input;
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

  <ThinBlock className="flex gap-2 w-full">
    <Button className="m-1">
      <Adjustments />
    </Button>
    <input
      type="text"
      placeholder="Search or enter URL"
      class="search-input-desktop"
      bind:this={iEl}
      bind:value={input}
      on:keypress={(e) => {
        if (e.key === "Enter") {
          // updateAndLoadInput(currentInput);
          iEl.blur();
        }
      }}
      on:focus={() => {
        setTimeout(() => {
          iEl.select();
          iEl.scrollLeft = iEl.scrollWidth;
        }, 1);
      }}
      on:focusout={() => {
        state.top_bar_input = decodeURIComponent(state.top_bar_input);
      }}
    />
    <Button className="m-1">
      <Bookmarks />
    </Button>
  </ThinBlock>
</div>
