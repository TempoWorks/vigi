<script lang="ts">
  import type { Body } from "@txtdot/dalet";
  import TagRenderer from "./TagRenderer.svelte";

  export let body: Body;
</script>

{#if body.Text}
  {body.Text}
{:else if body.Tags}
  {#each body.Tags as tag}
    <TagRenderer {tag} />
  {/each}
{/if}
