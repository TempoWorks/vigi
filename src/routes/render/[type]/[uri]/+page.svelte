<script lang="ts">
  import DaletRenderer from "$lib/components/DaletRenderer.svelte";

  let { data } = $props();
</script>

<DaletRenderer body={data.page.body} />
