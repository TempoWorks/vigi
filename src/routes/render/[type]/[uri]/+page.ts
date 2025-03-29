import { state } from "$lib/state.svelte.js";
import { invoke } from "@tauri-apps/api/core";
import type { Page } from "@txtdot/dalet";

export async function load({ params }) {
  const page = (await invoke("process_url", {
    input: params.uri,
  })) as Page;

  state.tabs[state.current_tab_index].description =
    page.description || undefined;
  state.tabs[state.current_tab_index].title = page.title || undefined;
  state.tabs[state.current_tab_index].url = params.uri;

  if (params.type === "auto")
    return {
      page,
    };
  else throw "Unsupported";
}
