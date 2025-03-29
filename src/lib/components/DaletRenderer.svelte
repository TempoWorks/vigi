<script lang="ts">
  import type { Page, Tag } from "@txtdot/dalet";
  import TagRenderer from "./TagRenderer.svelte";

  export let page: Page;
</script>

<section class="render">
  {#each page.body as tag}
    <TagRenderer {tag} />
  {/each}
</section>
