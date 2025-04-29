import { internalState, vigiState } from "$lib/state.svelte.js";
import type { EngineType } from "$lib/types.js";
import { currentTab, currentTabLink, manageNewLink } from "$lib/utils.js";
import { invoke } from "@tauri-apps/api/core";
import type { Page } from "@txtdot/dalet";

export async function load({ params }) {
  const currLink = currentTabLink();

  let page: Page;

  if (
    currLink.renderType === params.type &&
    currLink.type === "render" &&
    currLink.uri === params.uri &&
    currLink.page
  )
    page = currLink.page;
  else {
    internalState.isLoading = true;
    try {
      page = (await invoke("process_url", {
        input: params.uri,
      })) as Page;

      if (
        currLink.renderType === params.type &&
        currLink.type === "render" &&
        currLink.uri === params.uri
      )
        vigiState.tabs[vigiState.currentTab].links[
          vigiState.tabs[vigiState.currentTab].currentLink
        ].page = page;

      internalState.isLoading = false;
    } catch (e) {
      internalState.isLoading = false;
      throw e;
    }
  }

  manageNewLink("render", params.type as EngineType, params.uri, page);

  return {
    page,
  };
}
