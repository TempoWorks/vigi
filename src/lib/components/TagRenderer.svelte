<script lang="ts">
  import type { Tag } from "@txtdot/dalet";
  import BodyRenderer from "./BodyRenderer.svelte";
  import { renderLnk } from "$lib/utils";

  export let tag: Tag;
</script>

{#if typeof tag === "string"}
  <p class="unsupported">unsupported tag</p>
{:else if tag.P}
  <p><BodyRenderer body={tag.P.body} /></p>
{:else if tag.NavLink}
  <a href={renderLnk("auto", tag.NavLink.dref)}>
    {#if tag.NavLink.body}
      <BodyRenderer body={tag.NavLink.body} />
    {:else}
      {tag.NavLink.dref}
    {/if}
  </a>
{:else}
  <p class="unsupported">unsupported tag</p>
{/if}
