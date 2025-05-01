import { internalState, vigiState } from "$lib/state.svelte.js";
import { currentTabLink, manageLink } from "$lib/utils.js";
import { invoke } from "@tauri-apps/api/core";
import type { Page, Tag } from "@txtdot/dalet";

export async function load({ params }) {
  const currLink = currentTabLink();

  let title: string | undefined = undefined;
  let body: Tag[];

  if (
    currLink.type === "render" &&
    currLink.uri === params.uri &&
    currLink.body &&
    currLink.title
  )
    body = currLink.body;
  else {
    internalState.isLoading = true;
    try {
      const page = (await invoke("process_url", {
        input: params.uri,
      })) as Page;

      body = page.body;
      title = page.title || undefined;

      if (currLink.type === "render" && currLink.uri === params.uri) {
        vigiState.tabs[vigiState.currentTab].links[
          vigiState.tabs[vigiState.currentTab].currentLink
        ].body = body;

        vigiState.tabs[vigiState.currentTab].links[
          vigiState.tabs[vigiState.currentTab].currentLink
        ].title = title;
      }

      internalState.isLoading = false;
    } catch (e) {
      internalState.isLoading = false;
      throw e;
    }
  }

  manageLink("render", params.uri, title, body);

  return {
    body,
  };
}
