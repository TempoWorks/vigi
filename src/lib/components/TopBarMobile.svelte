<script lang="ts">
  import CompactBlock from "./CompactBlock.svelte";
  import ThinBlock from "./ThinBlock.svelte";

  import AdjustmentsButton from "./buttons/AdjustmentsButton.svelte";
  import TopBarInput from "./TopBarInput.svelte";
  import BookmarkButton from "./buttons/BookmarkButton.svelte";
  import HomeButton from "./buttons/HomeButton.svelte";
  import PlusTabButton from "./buttons/PlusTabButton.svelte";
</script>

<div class="top-bar">
  <CompactBlock className="navigation-buttons">
    <HomeButton />
  </CompactBlock>

  <ThinBlock className="top-bar-input">
    <AdjustmentsButton />
    <TopBarInput />
    <BookmarkButton />
  </ThinBlock>

  <CompactBlock className="navigation-buttons">
    <PlusTabButton />
  </CompactBlock>
</div>
