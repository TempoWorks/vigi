<script lang="ts">
  import type { SiteTab } from "$lib/types";

  export let tab: SiteTab;
</script>

<button class="tab">
  {tab.title ? tab.title : "No title"}
</button>
