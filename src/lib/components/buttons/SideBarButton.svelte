<script>
  import CloseSidebar from "$lib/icons/CloseSidebar.svelte";
  import OpenSidebar from "$lib/icons/OpenSidebar.svelte";
  import { manageSidebar } from "$lib/management";
  import { temporal } from "$lib/state.svelte";

  import Button from "../Button.svelte";
</script>

<Button onclick={manageSidebar}>
  {#if temporal.sidebar_open}
    <CloseSidebar />
  {:else}
    <OpenSidebar />
  {/if}
</Button>
