import { manageLink } from "$lib/management";
import { temporal, vigi } from "$lib/state.svelte.js";
import { currentTabLink } from "$lib/utils.js";
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
    temporal.loading = true;
    try {
      const page = (await invoke("process_url", {
        input: params.uri,
      })) as Page;

      body = page.body;
      title = page.title || undefined;

      if (currLink.type === "render" && currLink.uri === params.uri) {
        vigi.tabs[vigi.currentTab].links[
          vigi.tabs[vigi.currentTab].currentLink
        ].body = body;

        vigi.tabs[vigi.currentTab].links[
          vigi.tabs[vigi.currentTab].currentLink
        ].title = title;
      }

      temporal.loading = false;
    } catch (e) {
      temporal.loading = false;
      throw e;
    }
  }

  manageLink("render", params.uri, title, body);

  return {
    body,
  };
}
