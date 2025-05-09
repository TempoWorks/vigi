<script>
  import { vigi } from "$lib/state.svelte";
  import Button from "../Button.svelte";
</script>

<Button
  className="tab-count"
  onclick={() => (vigi.sidebar_open = !vigi.sidebar_open)}
>
  {vigi.tabs.length}
</Button>
