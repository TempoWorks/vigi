<script lang="ts">
  import { invoke } from "@tauri-apps/api/core";

  import { type Page } from "@txtdot/dalet";

  let greetMsg: Page | undefined = $state();

  async function greet(event: Event) {
    event.preventDefault();
    // Learn more about Tauri commands at https://tauri.app/develop/calling-rust/
    greetMsg = await invoke("process_url", {
      input: "gemini://geminiprotocol.net/docs/specification.gmi",
    });
  }
</script>

<div class="block">
  <h1 class="text-3xl font-bold">Hello world!</h1>
  <button class="button" onclick={greet}>Click</button>
  <div>
    {JSON.stringify(greetMsg)}
  </div>
</div>
