import { manageLink } from "$lib/management";
import type { DrovaError } from "$lib/types.js";
import { currentTab, currentTabLink, loadTab, updateLink } from "$lib/utils.js";
import type { Tag } from "@txtdot/dalet";

export async function load({ params }) {
  const currTab = currentTab();

  updateLink(currTab.id, { loading: undefined });

  const currLink = currentTabLink();

  let title: string | undefined;
  let body: Tag[] | undefined;
  let error: DrovaError | undefined;

  if (
    currLink.ty === "RENDER" &&
    currLink.uri === params.uri &&
    currLink.body &&
    currLink.title
  ) {
    body = currLink.body;
    title = currLink.title;
  } else {
    const res = await loadTab(currTab.id, params.uri);

    body = res.body;
    error = res.error;
  }

  manageLink("RENDER", params.uri, title, body);

  return {
    body,
    error,
  };
}
