<script lang="ts">
  import CompactBlock from "./CompactBlock.svelte";
  import HistoryBack from "./buttons/HistoryBack.svelte";
  import HistoryForward from "./buttons/HistoryForward.svelte";
  import ReloadButton from "./buttons/ReloadButton.svelte";
  import TabCount from "./buttons/TabCount.svelte";
  import DotsButton from "./buttons/DotsButton.svelte";
</script>

<div class="bot-bar">
  <CompactBlock className="bot-bar-navigation-buttons">
    <HistoryBack />
    <HistoryForward />
    <TabCount />
    <ReloadButton />
    <DotsButton />
  </CompactBlock>
</div>
