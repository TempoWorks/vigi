<script lang="ts">
  import CompactBlock from "./CompactBlock.svelte";
  import ThinBlock from "./ThinBlock.svelte";

  import AdjustmentsButton from "./buttons/AdjustmentsButton.svelte";
  import TopBarInput from "./TopBarInput.svelte";
  import BookmarkButton from "./buttons/BookmarkButton.svelte";
  import HomeButton from "./buttons/HomeButton.svelte";
  import PlusTabButton from "./buttons/PlusTabButton.svelte";
  import { temporal } from "$lib/state.svelte";
</script>

<div class="top-bar">
  {#if !temporal.topBarOpen}
    <CompactBlock className="navigation-buttons">
      <HomeButton />
    </CompactBlock>
  {/if}

  <ThinBlock className="top-bar-input">
    {#if !temporal.topBarOpen}
      <AdjustmentsButton />
    {/if}
    <TopBarInput />
    {#if !temporal.topBarOpen}
      <BookmarkButton />
    {/if}
  </ThinBlock>

  {#if !temporal.topBarOpen}
    <CompactBlock className="navigation-buttons">
      <PlusTabButton />
    </CompactBlock>
  {/if}
</div>
