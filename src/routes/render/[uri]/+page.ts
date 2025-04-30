import { internalState, vigiState } from "$lib/state.svelte.js";
import { currentTabLink, manageLink } from "$lib/utils.js";
import { invoke } from "@tauri-apps/api/core";
import type { Page } from "@txtdot/dalet";

export async function load({ params }) {
  const currLink = currentTabLink();

  let page: Page;

  if (
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

      if (currLink.type === "render" && currLink.uri === params.uri)
        vigiState.tabs[vigiState.currentTab].links[
          vigiState.tabs[vigiState.currentTab].currentLink
        ].page = page;

      internalState.isLoading = false;
    } catch (e) {
      internalState.isLoading = false;
      throw e;
    }
  }

  manageLink("render", params.uri, page);

  return {
    page,
  };
}
