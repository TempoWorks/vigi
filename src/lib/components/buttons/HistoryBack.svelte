<script>
  import { goto } from "$app/navigation";
  import ChevronLeft from "$lib/icons/ChevronLeft.svelte";
  import { vigi } from "$lib/state.svelte";
  import { currentTabInnerURN } from "$lib/utils";

  import Button from "../Button.svelte";
</script>

<Button
  disabled={vigi.tabs[vigi.currentTab].currentLink === 0}
  onclick={() => {
    vigi.tabs[vigi.currentTab].currentLink -= 1;
    goto(currentTabInnerURN());
  }}
>
  <ChevronLeft />
</Button>
