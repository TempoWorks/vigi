<script>
  import { invalidateAll } from "$app/navigation";
  import Reload from "$lib/icons/Reload.svelte";
  import { internalState, vigiState } from "$lib/state.svelte";

  import Button from "../Button.svelte";
</script>

<Button
  onclick={() => {
    vigiState.tabs[vigiState.currentTab].links[
      vigiState.tabs[vigiState.currentTab].currentLink
    ].body = undefined;
    invalidateAll();
  }}
  disabled={internalState.isLoading}
>
  <Reload class={internalState.isLoading ? "loading" : ""} />
</Button>
