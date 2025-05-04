import { vigi } from "./state.svelte";
import type { PermanentState, TabLink, VigiState } from "./types";
import { goto } from "$app/navigation";
import { invoke } from "@tauri-apps/api/core";

export function saveState() {
  let state: VigiState = JSON.parse(JSON.stringify(vigi));

  let permanent: PermanentState = {
    currentTab: state.currentTab,
    sidebar_open: state.sidebar_open,
    tabs: state.tabs.map(({ currentLink, links }) => {
      return {
        currentLink,
        links: links.map(({ ty, uri, title }) => {
          return {
            ty,
            uri,
            title,
          };
        }),
      };
    }),
  };

  invoke("save_state", { input: JSON.stringify(permanent) });
}

export async function loadState() {
  try {
    const permanent: PermanentState = JSON.parse(await invoke("get_state"));

    vigi.currentTab = permanent.currentTab;
    vigi.sidebar_open = permanent.sidebar_open;

    let tabCounter = 0;

    vigi.tabs = permanent.tabs.map(({ currentLink, links }) => {
      return { currentLink, links, id: tabCounter++ };
    });

    vigi.tabCounter = tabCounter;
  } catch {}
}

export function currentTab() {
  return vigi.tabs[vigi.currentTab];
}

export function currentTabLink() {
  const current = currentTab();

  return current.links[current.currentLink];
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
