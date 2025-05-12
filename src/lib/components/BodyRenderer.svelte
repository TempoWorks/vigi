<script lang="ts">
  import type { Body } from "@txtdot/dalet";
  import TagRenderer from "./TagRenderer.svelte";
  import TextRenderer from "./TextRenderer.svelte";

  export let body: Body;
</script>

{#if body.Text}
  <TextRenderer>{body.Text}</TextRenderer>
{:else if body.Tags}
  {#each body.Tags as tag}
    <TagRenderer {tag} />
  {/each}
{/if}
