<script>
  import { goto } from "$app/navigation";
  import { vigiState } from "$lib/state.svelte";
  import Button from "../Button.svelte";
</script>

<Button className="tab-count" onclick={() => goto("/browser/tabs")}>
  {vigiState.tabs.length}
</Button>
