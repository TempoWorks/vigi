<script lang="ts">
  import type { Tag } from "@txtdot/dalet";
  import BodyRenderer from "./BodyRenderer.svelte";
  import { renderLink } from "$lib/utils";
  import Highlight, { HighlightAuto } from "svelte-highlight";

  import * as languages from "svelte-highlight/languages";

  import TagRenderer from "$lib/components/TagRenderer.svelte";
  import TextRenderer from "./TextRenderer.svelte";

  export let tag: Tag;
</script>

{#if typeof tag === "string"}
  {#if tag === "HorizontalBreak"}
    <hr />
  {:else}
    <p class="unsupported">
      <TextRenderer>Unsupported Tag: {tag}</TextRenderer>
    </p>
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
      <TextRenderer>{tag.NavLink.dref}</TextRenderer>
    {/if}
  </a>
{:else if tag.Heading}
  {#if tag.Heading.heading === 1}
    <h1>
      <TextRenderer>{tag.Heading.body}</TextRenderer>
    </h1>
  {:else if tag.Heading.heading === 2}
    <h2>
      <TextRenderer>{tag.Heading.body}</TextRenderer>
    </h2>
  {:else if tag.Heading.heading === 3}
    <h3>
      <TextRenderer>{tag.Heading.body}</TextRenderer>
    </h3>
  {:else if tag.Heading.heading === 4}
    <h4>
      <TextRenderer>{tag.Heading.body}</TextRenderer>
    </h4>
  {:else if tag.Heading.heading === 5}
    <h5>
      <TextRenderer>{tag.Heading.body}</TextRenderer>
    </h5>
  {:else if tag.Heading.heading === 6}
    <h6>
      <TextRenderer>{tag.Heading.body}</TextRenderer>
    </h6>
  {/if}
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
{:else if tag.Mono}
  <pre>
{tag.Mono.body}</pre>
{:else}
  <p class="unsupported">
    <TextRenderer>Unsupported Tag: {JSON.stringify(tag, null, 2)}</TextRenderer>
  </p>
{/if}
