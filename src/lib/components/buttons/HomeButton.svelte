<script>
  import { goto } from "$app/navigation";
  import Home from "$lib/icons/Home.svelte";

  import Button from "../Button.svelte";
</script>

<Button onclick={() => goto("/browser/main")}>
  <Home />
</Button>
