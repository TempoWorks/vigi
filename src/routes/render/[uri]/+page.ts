import { manageLink } from "$lib/management";
import { temporal, vigi } from "$lib/state.svelte.js";
import { convertError, currentTabLink } from "$lib/utils.js";
import { error } from "@sveltejs/kit";
import { invoke } from "@tauri-apps/api/core";
import type { Page, Tag } from "@txtdot/dalet";

export async function load({ params }) {
  temporal.loading = false;

  const currLink = currentTabLink();

  let title: string | undefined = undefined;
  let body: Tag[];

  if (
    currLink.ty === "RENDER" &&
    currLink.uri === params.uri &&
    currLink.body &&
    currLink.title
  ) {
    body = currLink.body;
    title = currLink.title;
  } else {
    temporal.loading = true;

    let currentTab = vigi.current_tab;
    let currentLink = vigi.tabs[currentTab].current_link;

    try {
      const page = (await invoke("process_url", {
        input: params.uri,
      })) as Page;

      body = page.body;
      title = page.title || undefined;

      if (currLink.ty === "RENDER" && currLink.uri === params.uri) {
        vigi.tabs[currentTab].links[currentLink].body = body;
        vigi.tabs[currentTab].links[currentLink].title = title;
      }

      temporal.loading = false;
    } catch (e) {
      vigi.tabs[currentTab].errored = true;
      manageLink("RENDER", params.uri, title);

      temporal.loading = false;

      error(500, convertError(e));
    }
  }

  manageLink("RENDER", params.uri, title, body);

  return {
    body,
  };
}
