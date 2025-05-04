<script>
  import { invalidateAll } from "$app/navigation";
  import Reload from "$lib/icons/Reload.svelte";
  import { temporal, vigi } from "$lib/state.svelte";

  import Button from "../Button.svelte";
</script>

<Button
  onclick={() => {
    vigi.tabs[vigi.current_tab].links[
      vigi.tabs[vigi.current_tab].current_link
    ].body = undefined;
    invalidateAll();
  }}
  disabled={temporal.loading}
>
  <Reload class={temporal.loading ? "loading" : ""} />
</Button>
