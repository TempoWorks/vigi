<script>
  import CloseSidebar from "$lib/icons/CloseSidebar.svelte";
  import OpenSidebar from "$lib/icons/OpenSidebar.svelte";
  import { vigiState } from "$lib/state.svelte";

  import Button from "../Button.svelte";
</script>

<Button
  onclick={() => {
    vigiState.sidebar_open = !vigiState.sidebar_open;
  }}
>
  {#if vigiState.sidebar_open}
    <CloseSidebar />
  {:else}
    <OpenSidebar />
  {/if}
</Button>
