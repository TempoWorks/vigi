<script lang="ts">
  import CompactBlock from "./CompactBlock.svelte";
  import ThinBlock from "./ThinBlock.svelte";

  import Sidebar from "./buttons/Sidebar.svelte";
  import HistoryBack from "./buttons/HistoryBack.svelte";
  import HistoryForward from "./buttons/HistoryForward.svelte";
  import ReloadButton from "./buttons/ReloadButton.svelte";
  import AdjustmentsButton from "./buttons/AdjustmentsButton.svelte";
  import TopBarInput from "./TopBarInput.svelte";
  import BookmarkButton from "./buttons/BookmarkButton.svelte";
</script>

<div class="top-bar">
  <CompactBlock className="navigation-buttons">
    <Sidebar />
    <HistoryBack />
    <HistoryForward />
    <ReloadButton />
  </CompactBlock>

  <ThinBlock className="top-bar-input">
    <AdjustmentsButton />
    <TopBarInput />
    <BookmarkButton />
  </ThinBlock>
</div>
