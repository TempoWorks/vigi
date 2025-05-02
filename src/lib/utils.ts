import type { Page, Tag } from "@txtdot/dalet";
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
    if (link.type === "render") {
      const url = new URL(urlString);
      return decodeURI(urlString.replace(`${url.protocol}//`, ""));
    } else {
      return link.title || urlString;
    }
  } catch {
    return urlString;
  }
}

export function manageLink(
  type: TabType,
  uri: string,
  title?: string,
  body?: Tag[]
) {
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
      title: title || undefined,
      body,
      uri,
    });

    vigiState.tabs[vigiState.currentTab].currentLink += 1;
  }
}

export function browserLinkManager(urn: string, title: string) {
  return () => {
    manageLink("browser", urn, title);
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

export function openNewTab() {
  vigiState.tabs.push({
    id: vigiState.tabCounter,
    currentLink: 0,
    links: [newTabLink],
  });

  vigiState.tabCounter += 1;

  goToTab(vigiState.tabs.length - 1);
}

export function goToTab(idx: number) {
  vigiState.currentTab = idx;

  goto(
    innerURN(
      vigiState.tabs[vigiState.currentTab].links[
        vigiState.tabs[vigiState.currentTab].currentLink
      ]
    )
  );
}

export const newTabLink: TabLink = {
  type: "browser",
  uri: "main",
  title: "New tab",
};
