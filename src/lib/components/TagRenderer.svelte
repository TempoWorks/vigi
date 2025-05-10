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
  {#if tag === "HorizontalBreak"}
    <hr />
  {:else if tag === "LineBreak"}
    <br />
  {:else}
    <p class="unsupported">Unsupported Tag: {tag}</p>
  {/if}
{:else if tag.Element}
  <BodyRenderer body={tag.Element.body} />
{:else if tag.Paragraph}
  <p><BodyRenderer body={tag.Paragraph.body} /></p>
{:else if tag.NavLink}
  <a href={renderLink(tag.NavLink.dref, true)}>
    {#if tag.NavLink.body}
      <BodyRenderer body={tag.NavLink.body} />
    {:else}
      {tag.NavLink.dref}
    {/if}
  </a>
{:else if tag.Heading}
  {@html `<h${tag.Heading.heading}>${tag.Heading.body}</h${tag.Heading.heading}>`}
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
{:else if tag.BlockQuote}
  <blockquote><BodyRenderer body={tag.BlockQuote.body} /></blockquote>
{:else if tag.Preformatted}
  <pre>{tag.Preformatted.body}</pre>
{:else}
  <pre> <p class="unsupported">Unsupported Tag: {JSON.stringify(
        tag,
        null,
        2
      )}</p></pre>
{/if}
