<script>
  import Plus from "$lib/icons/Plus.svelte";
  import { openNewTab } from "$lib/management";
  import Button from "../Button.svelte";
</script>

<Button onclick={openNewTab}>
  <Plus />
</Button>
