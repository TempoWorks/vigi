<script>
  import { invalidateAll } from "$app/navigation";
  import Reload from "$lib/icons/Reload.svelte";
  import { vigi } from "$lib/state.svelte";

  import Button from "../Button.svelte";

  let loading = $derived(
    vigi.tabs[vigi.current_tab].links[vigi.tabs[vigi.current_tab].current_link]
      .loading
  );
</script>

<Button
  onclick={() => {
    vigi.tabs[vigi.current_tab].links[
      vigi.tabs[vigi.current_tab].current_link
    ].body = undefined;
    invalidateAll();
  }}
  disabled={loading}
>
  <Reload class={loading ? "loading" : ""} />
</Button>
