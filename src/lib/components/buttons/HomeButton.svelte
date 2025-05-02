<script>
  import { goto } from "$app/navigation";
  import Home from "$lib/icons/Home.svelte";
  import { innerURN, newTabLink } from "$lib/utils";

  import Button from "../Button.svelte";
</script>

<Button onclick={() => goto(innerURN(newTabLink))}>
  <Home />
</Button>
