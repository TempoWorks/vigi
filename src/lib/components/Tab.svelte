<script lang="ts">
  import type { SiteTab } from "$lib/types";

  export let tab: SiteTab;
</script>

<button class="tab">
  {tab.links[tab.currentLink].title || "No title"}
</button>
