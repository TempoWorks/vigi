import type { Page } from "@txtdot/dalet";
import { vigiState } from "./state.svelte";
import type { TabLink, TabType } from "./types";
import { goto } from "$app/navigation";

export function currentTab() {
  return vigiState.tabs[vigiState.currentTab];
}

export function currentTabLink() {
  const current = currentTab();

  return current.links[current.currentLink];
}

export function currentTabInnerURN() {
  return innerURN(currentTabLink());
}

export function innerURN(link: TabLink): string {
  if (link.type === "render") {
    return renderLink(link.uri);
  } else {
    return `/${link.type}/${link.uri}`;
  }
}

export function linkToURI(link: TabLink) {
  if (link.type === "render") return link.uri;
  else return `${link.type}://${link.uri}`;
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
    const url = new URL(urlString);
    return decodeURI(urlString.replace(`${url.protocol}//`, ""));
  } catch {
    return urlString;
  }
}

export function manageLink(type: TabType, uri: string, page?: Page) {
  const currTab = currentTab();
  const currLink = currentTabLink();

  if (currLink.type !== type || currLink.uri !== uri) {
    if (currTab.currentLink !== currTab.links.length - 1) {
      vigiState.tabs[vigiState.currentTab].links = currTab.links.slice(
        0,
        currTab.currentLink + 1
      );
    }

    vigiState.tabs[vigiState.currentTab].links.push({
      type,
      page,
      uri,
    });

    vigiState.tabs[vigiState.currentTab].currentLink += 1;
  }
}

export function browserLinkManager(urn: string) {
  return () => {
    manageLink("browser", urn);
  };
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
