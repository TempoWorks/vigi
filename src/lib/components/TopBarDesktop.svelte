<script lang="ts">
  import Adjustments from "$lib/icons/Adjustments.svelte";
  import Bookmarks from "$lib/icons/Bookmarks.svelte";
  import ChevronLeft from "$lib/icons/ChevronLeft.svelte";
  import ChevronRight from "$lib/icons/ChevronRight.svelte";
  import Reload from "$lib/icons/Reload.svelte";
  import Button from "./Button.svelte";
  import CompactBlock from "./CompactBlock.svelte";
  import ThinBlock from "./ThinBlock.svelte";

  import { invalidateAll, onNavigate } from "$app/navigation";
  import { currentTabLink, formatInputUrl } from "$lib/utils";

  let iEl: HTMLInputElement;

  let input = "";
  let currentInput = "";

  onNavigate(() => {
    input = formatInputUrl(currentTabLink().uri);
  });
</script>

<div class="top-bar-desktop">
  <CompactBlock className="navigation-buttons-desktop">
    <Button>
      <ChevronLeft />
    </Button>
    <Button>
      <ChevronRight />
    </Button>
    <Button onclick={() => invalidateAll()}>
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
      onkeypress={(e) => {
        if (e.key === "Enter") {
          // updateAndLoadInput(currentInput);
          iEl.blur();
        }
      }}
      onfocus={() => {
        input = currentInput || currentTabLink().uri;

        setTimeout(() => {
          iEl.select();
          iEl.scrollLeft = iEl.scrollWidth;
        }, 1);
      }}
      onfocusout={() => {
        if (input) currentInput = input;
        else currentInput = currentTabLink().uri;

        input = formatInputUrl(currentTabLink().uri);
      }}
    />
    <Button className="top-bar-input-button-desktop">
      <Bookmarks />
    </Button>
  </ThinBlock>
</div>
