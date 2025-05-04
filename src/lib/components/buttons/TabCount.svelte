<script>
  import { vigi } from "$lib/state.svelte";
  import Button from "../Button.svelte";
</script>

<Button disabled className="tab-count">
  {vigi.tabs.length}
</Button>
