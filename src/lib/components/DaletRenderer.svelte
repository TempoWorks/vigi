<script lang="ts">
  import type { Tag } from "@txtdot/dalet";
  import TagRenderer from "./TagRenderer.svelte";

  export let body: Tag[];
</script>

<section class="render">
  {#each body as tag}
    <TagRenderer {tag} />
  {/each}
</section>
