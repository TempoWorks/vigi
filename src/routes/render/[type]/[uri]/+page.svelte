<script lang="ts">
  import DaletRenderer from "$lib/components/DaletRenderer.svelte";

  let { data } = $props();
</script>

{#if data.page}
  <DaletRenderer page={data.page} />
{/if}
