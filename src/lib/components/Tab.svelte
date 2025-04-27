<script lang="ts">
  import type { SiteTab } from "$lib/types";

  export let tab: SiteTab;
</script>

<div class="interactive-block">
  {tab.title ? tab.title : "No title"}
</div>
