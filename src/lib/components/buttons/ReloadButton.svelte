<script>
  import { invalidateAll } from "$app/navigation";
  import Reload from "$lib/icons/Reload.svelte";
  import { temporal, vigi } from "$lib/state.svelte";

  import Button from "../Button.svelte";
</script>

<Button
  onclick={() => {
    vigi.tabs[vigi.currentTab].links[
      vigi.tabs[vigi.currentTab].currentLink
    ].body = undefined;
    invalidateAll();
  }}
  disabled={temporal.loading}
>
  <Reload class={temporal.loading ? "loading" : ""} />
</Button>
