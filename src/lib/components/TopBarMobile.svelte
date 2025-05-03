<script lang="ts">
  import CompactBlock from "./CompactBlock.svelte";
  import ThinBlock from "./ThinBlock.svelte";

  import AdjustmentsButton from "./buttons/AdjustmentsButton.svelte";
  import TopBarInput from "./TopBarInput.svelte";
  import BookmarkButton from "./buttons/BookmarkButton.svelte";
  import HomeButton from "./buttons/HomeButton.svelte";
  import PlusTabButton from "./buttons/PlusTabButton.svelte";
  import { internalState } from "$lib/state.svelte";
</script>

<div class="top-bar">
  {#if !internalState.topBarOpen}
    <CompactBlock className="navigation-buttons">
      <HomeButton />
    </CompactBlock>
  {/if}

  <ThinBlock className="top-bar-input">
    {#if !internalState.topBarOpen}
      <AdjustmentsButton />
    {/if}
    <TopBarInput />
    {#if !internalState.topBarOpen}
      <BookmarkButton />
    {/if}
  </ThinBlock>

  {#if !internalState.topBarOpen}
    <CompactBlock className="navigation-buttons">
      <PlusTabButton />
    </CompactBlock>
  {/if}
</div>
