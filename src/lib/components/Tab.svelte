<script lang="ts">
  import { vigiState } from "$lib/state.svelte";
  import type { SiteTab } from "$lib/types";
  import { goToTab } from "$lib/utils";

  export let tab: SiteTab;
  export let idx: number;
</script>

<button
  class="tab"
  class:selected={vigiState.currentTab === idx}
  onclick={() => goToTab(idx)}
>
  {tab.links[tab.currentLink].title || "No title"}
</button>
