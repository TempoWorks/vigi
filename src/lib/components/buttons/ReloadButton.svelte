<script>
  import { invalidateAll } from "$app/navigation";
  import Reload from "$lib/icons/Reload.svelte";
  import { vigi } from "$lib/state.svelte";

  import Button from "../Button.svelte";

  let currTab = $derived(vigi.tabs[vigi.current_tab]);
  let loading = $derived(currTab.links[currTab.current_link].loading);
</script>

<Button
  onclick={() => {
    currTab.links[currTab.current_link].body = undefined;
    invalidateAll();
  }}
  disabled={loading}
>
  <Reload class={loading ? "loading" : ""} />
</Button>
