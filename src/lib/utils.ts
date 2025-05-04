import { vigi } from "./state.svelte";
import type { TabLink, VigiState } from "./types";
import { goto } from "$app/navigation";
import { invoke } from "@tauri-apps/api/core";

export function saveState() {
  invoke("save_state", { state: vigi });
}

export async function loadState() {
  try {
    const new_state: VigiState = await invoke("get_state");

    vigi.current_tab = new_state.current_tab;
    vigi.sidebar_open = new_state.sidebar_open;
    vigi.tabs = new_state.tabs;
    vigi.tab_counter = new_state.tab_counter;
  } catch {}
}

export function currentTab() {
  return vigi.tabs[vigi.current_tab];
}

export function currentTabLink() {
  const current = currentTab();

  return current.links[current.current_link];
}

export function currentTabInnerURN() {
  return innerURN(currentTabLink());
}

export function innerURN(link: TabLink): string {
  if (link.ty === "RENDER") {
    return renderLink(link.uri);
  } else {
    return `/${link.ty.toLowerCase()}/${link.uri}`;
  }
}

export function linkToURI(link: TabLink) {
  if (link.ty === "RENDER") return link.uri;
  else return `${link.ty}://${link.uri}`;
}

export function renderLink(uri: string, relative?: boolean) {
  if (relative) {
    try {
      return `/render/${encodeURIComponent(
        new URL(uri, currentTabLink().uri).toString()
      )}`;
    } catch {}
  }

  return `/render/${encodeURIComponent(uri)}`;
}

export function formatInputLink(link: TabLink): string {
  const urlString = linkToURI(link);
  try {
    if (link.ty === "RENDER") {
      const url = new URL(urlString);
      return decodeURI(urlString.replace(`${url.protocol}//`, ""));
    } else {
      return link.title || urlString;
    }
  } catch {
    return urlString;
  }
}

export function gotoTBI(tbi: string) {
  const url = isUrl(tbi);
  if (url)
    if (url.protocol !== "browser:") goto(renderLink(tbi));
    else goto(`/browser/${url.hostname}/${url.pathname}`);
  else goto(`/browser/search/${encodeURIComponent(tbi)}`);
}

export function isUrl(s: string) {
  try {
    return new URL(s);
  } catch {
    return false;
  }
}

export const newTabLink: TabLink = {
  ty: "BROWSER",
  uri: "main",
  title: "New tab",
};
