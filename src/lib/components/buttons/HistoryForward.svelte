<script>
  import { goto } from "$app/navigation";
  import ChevronRight from "$lib/icons/ChevronRight.svelte";
  import { vigi } from "$lib/state.svelte";
  import { currentTabInnerURN } from "$lib/utils";

  import Button from "../Button.svelte";
</script>

<Button
  disabled={vigi.tabs[vigi.currentTab].currentLink >=
    vigi.tabs[vigi.currentTab].links.length - 1}
  onclick={() => {
    vigi.tabs[vigi.currentTab].currentLink += 1;
    goto(currentTabInnerURN());
  }}
>
  <ChevronRight />
</Button>
