<script>
  import { goto } from "$app/navigation";
  import ChevronLeft from "$lib/icons/ChevronLeft.svelte";
  import { vigiState } from "$lib/state.svelte";
  import { currentTabInnerURN } from "$lib/utils";

  import Button from "../Button.svelte";
</script>

<Button
  disabled={vigiState.tabs[vigiState.currentTab].currentLink === 0}
  onclick={() => {
    vigiState.tabs[vigiState.currentTab].currentLink -= 1;
    goto(currentTabInnerURN());
  }}
>
  <ChevronLeft />
</Button>
