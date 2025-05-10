<script>
  import { goto } from "$app/navigation";
  import ChevronRight from "$lib/icons/ChevronRight.svelte";
  import { vigi } from "$lib/state.svelte";
  import { currentTabInnerURN } from "$lib/utils";

  import Button from "../Button.svelte";

  let currTab = $derived(vigi.tabs[vigi.current_tab]);
</script>

<Button
  disabled={currTab.current_link >= currTab.links.length - 1}
  onclick={() => {
    currTab.current_link += 1;
    goto(currentTabInnerURN());
  }}
>
  <ChevronRight />
</Button>
