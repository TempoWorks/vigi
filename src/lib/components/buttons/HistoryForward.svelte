<script>
  import { goto } from "$app/navigation";
  import ChevronRight from "$lib/icons/ChevronRight.svelte";
  import { vigiState } from "$lib/state.svelte";
  import { currentTabInnerURN } from "$lib/utils";

  import Button from "../Button.svelte";
</script>

<Button
  disabled={vigiState.tabs[vigiState.currentTab].currentLink >=
    vigiState.tabs[vigiState.currentTab].links.length - 1}
  onclick={() => {
    vigiState.tabs[vigiState.currentTab].currentLink += 1;
    goto(currentTabInnerURN());
  }}
>
  <ChevronRight />
</Button>
