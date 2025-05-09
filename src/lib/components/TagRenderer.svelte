<script lang="ts">
  import type { Tag } from "@txtdot/dalet";
  import BodyRenderer from "./BodyRenderer.svelte";
  import { renderLink } from "$lib/utils";
  import Highlight, { HighlightAuto } from "svelte-highlight";

  import * as languages from "svelte-highlight/languages";

  import TagRenderer from "$lib/components/TagRenderer.svelte";

  export let tag: Tag;
</script>

{#if typeof tag === "string"}
  <p class="unsupported">unsupported tag</p>
{:else if tag.El}
  <BodyRenderer body={tag.El.body} />
{:else if tag.P}
  <p><BodyRenderer body={tag.P.body} /></p>
{:else if tag.NavLink}
  <a href={renderLink(tag.NavLink.dref, true)}>
    {#if tag.NavLink.body}
      <BodyRenderer body={tag.NavLink.body} />
    {:else}
      {tag.NavLink.dref}
    {/if}
  </a>
{:else if tag.H}
  {@html `<h${tag.H.heading}>${tag.H.body}</h${tag.H.heading}>`}
{:else if tag.List}
  <ol class={tag.List.style}>
    {#each tag.List.body as item}
      <li>
        <TagRenderer tag={item} />
      </li>
    {/each}
  </ol>
{:else if tag.Code}
  {#if tag.Code.language && languages[tag.Code.language as unknown as "typescript"]}
    <Highlight
      language={languages[tag.Code.language as unknown as "typescript"]}
      code={tag.Code.body}
    />
  {:else}
    <HighlightAuto code={tag.Code.body} />
  {/if}
{:else if tag.Bq}
  <blockquote><BodyRenderer body={tag.Bq.body} /></blockquote>
{:else if tag.Pre}
  <pre>{tag.Pre.body}</pre>
{:else}
  <p class="unsupported">unsupported tag</p>
{/if}
