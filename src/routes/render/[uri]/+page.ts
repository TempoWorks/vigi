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
    currLink.ty === "RENDER" &&
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

      if (currLink.ty === "RENDER" && currLink.uri === params.uri) {
        vigi.tabs[vigi.current_tab].links[
          vigi.tabs[vigi.current_tab].current_link
        ].body = body;

        vigi.tabs[vigi.current_tab].links[
          vigi.tabs[vigi.current_tab].current_link
        ].title = title;
      }

      temporal.loading = false;
    } catch (e) {
      temporal.loading = false;
      throw e;
    }
  }

  manageLink("RENDER", params.uri, title, body);

  return {
    body,
  };
}
