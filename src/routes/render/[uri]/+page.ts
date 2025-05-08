import { invalidateAll } from "$app/navigation";
import { manageLink } from "$lib/management";
import type { DrovaError } from "$lib/types.js";
import {
  currentTab,
  currentLink,
  loadTab,
  updateLinkByTabId,
} from "$lib/utils.js";
import type { Tag } from "@txtdot/dalet";

export async function load({ params }) {
  const currTab = currentTab();

  updateLinkByTabId(currTab.id, { loading: undefined });

  const currLink = currentLink();

  let body: Tag[] | undefined;
  let error: DrovaError | undefined;

  if (
    currLink.ty === "RENDER" &&
    currLink.uri === params.uri &&
    currLink.body &&
    currLink.title
  ) {
    body = currLink.body;
  } else {
    manageLink("RENDER", params.uri);

    const res = await loadTab(currTab.id, params.uri);

    body = res.body;
    error = res.error;
  }

  return {
    body,
    error,
  };
}
