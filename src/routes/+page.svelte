<script lang="ts">
  import DaletRenderer from "$lib/components/DaletRenderer.svelte";
  import { invoke } from "@tauri-apps/api/core";

  import { type Page } from "@txtdot/dalet";

  let page: Page | undefined = $state();

  async function load() {
    page = await invoke("process_url", {
      input: "gemini://geminiprotocol.net/docs/gemtext-specification.gmi",
    });
  }

  load();
</script>

<div class="flex gap-2">
  <div class="browser-window">
    {#if page}
      <DaletRenderer {page} />
    {/if}
  </div>
</div>
