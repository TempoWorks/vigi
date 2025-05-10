<script>
  import { temporal, vigi } from "$lib/state.svelte";
  import Button from "../Button.svelte";
</script>

<Button
  className="tab-count"
  onclick={() => (temporal.sidebar_open = !temporal.sidebar_open)}
>
  {vigi.tabs.length}
</Button>
