<script>
  import { vigiState } from "$lib/state.svelte";
  import Button from "../Button.svelte";
</script>

<Button className="tab-count">
  {vigiState.tabs.length}
</Button>
