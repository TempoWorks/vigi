<script>
  import { goto } from "$app/navigation";
  import { currentTabInnerURN } from "$lib/utils";

  goto(currentTabInnerURN());
</script>
