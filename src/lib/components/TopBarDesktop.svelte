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
  import Sidebar from "./buttons/Sidebar.svelte";
  import HistoryBack from "./buttons/HistoryBack.svelte";
  import HistoryForward from "./buttons/HistoryForward.svelte";
  import ReloadButton from "./buttons/ReloadButton.svelte";
  import AdjustmentsButton from "./buttons/AdjustmentsButton.svelte";
  import TopBarInput from "./TopBarInput.svelte";
  import BookmarkButton from "./buttons/BookmarkButton.svelte";
</script>

<div class="top-bar-desktop">
  <CompactBlock className="navigation-buttons-desktop">
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
