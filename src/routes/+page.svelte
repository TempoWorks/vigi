<script lang="ts">
  import { goto } from "$app/navigation";
  import { currentTabInnerURN, loadState } from "$lib/utils";
  import { onMount } from "svelte";

  onMount(async () => {
    await loadState();
    goto(currentTabInnerURN());
  });
</script>
