import { state } from "$lib/state.svelte.js";
import type { EngineType } from "$lib/types.js";
import { invoke } from "@tauri-apps/api/core";
import type { Page } from "@txtdot/dalet";

export async function load({ params }) {
  const page = (await invoke("process_url", {
    input: params.uri,
  })) as Page;

  state.tabs[state.current_tab_index].description =
    page.description || undefined;
  state.tabs[state.current_tab_index].title = page.title || undefined;
  state.tabs[state.current_tab_index].link = {
    type: "render",
    uri: params.uri,
    renderType: params.type as EngineType,
  };

  if (params.type === "auto")
    return {
      page,
      params,
    };
  else throw "Unsupported";
}
