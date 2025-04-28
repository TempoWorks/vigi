<script>
  import { goto } from "$app/navigation";
  import { currentTabRenderUrl } from "$lib/utils";

  goto(currentTabRenderUrl());
</script>
