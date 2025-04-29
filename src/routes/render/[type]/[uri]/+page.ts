import { internal_state, state } from "$lib/state.svelte.js";
import type { EngineType } from "$lib/types.js";
import { invoke } from "@tauri-apps/api/core";
import type { Page } from "@txtdot/dalet";

export async function load({ params }) {
  internal_state.is_loading = true;

  try {
    const page = (await invoke("process_url", {
      input: params.uri,
    })) as Page;

    internal_state.is_loading = false;

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
  } catch (e) {
    internal_state.is_loading = false;
    throw e;
  }
}
