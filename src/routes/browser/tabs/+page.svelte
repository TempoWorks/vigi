<script>
  import Tab from "$lib/components/Tab.svelte";
  import { vigiState } from "$lib/state.svelte";
</script>

<div class="tabs">
  {#each vigiState.tabs as tab, idx (tab.id)}
    <Tab {tab} {idx} />
  {/each}
</div>
