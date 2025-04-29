import { internalState, vigiState } from "$lib/state.svelte.js";
import type { EngineType } from "$lib/types.js";
import { invoke } from "@tauri-apps/api/core";
import type { Page } from "@txtdot/dalet";

export async function load({ params }) {
  internalState.isLoading = true;

  try {
    const page = (await invoke("process_url", {
      input: params.uri,
    })) as Page;

    internalState.isLoading = false;

    vigiState.tabs[vigiState.current_tab_index].description =
      page.description || undefined;
    vigiState.tabs[vigiState.current_tab_index].title = page.title || undefined;
    vigiState.tabs[vigiState.current_tab_index].link = {
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
    internalState.isLoading = false;
    throw e;
  }
}
