<script>
  import { goto } from "$app/navigation";
  import { currentTabInnerUrl } from "$lib/utils";

  goto(currentTabInnerUrl());
</script>
