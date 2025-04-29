import type { Page } from "@txtdot/dalet";
import { vigiState } from "./state.svelte";
import type { EngineType, TabLink, TabType } from "./types";

export function currentTab() {
  return vigiState.tabs[vigiState.currentTab];
}

export function currentTabLink() {
  const current = currentTab();

  return current.links[current.currentLink];
}

export function currentTabInnerUrl() {
  return innerUrl(currentTabLink());
}

export function innerUrl(url: TabLink): string {
  if (url.type === "render") {
    return renderLnk(url.renderType || "auto", url.uri);
  } else {
    return `/${url.type}/${url.uri}`;
  }
}

export function renderLnk(type: EngineType, link: string, inner?: boolean) {
  return `/render/${type}/${encodeURIComponent(
    inner ? new URL(link, currentTabLink().uri).toString() : link
  )}`;
}

export function formatInputUrl(urlString: string): string {
  try {
    const url = new URL(urlString);
    return decodeURI(urlString.replace(`${url.protocol}//`, ""));
  } catch (e) {
    return urlString;
  }
}

export function manageNewLink(
  type: TabType,
  renderType: EngineType,
  uri: string,
  page?: Page
) {
  const currTab = currentTab();
  const currLink = currentTabLink();

  if (
    currLink.renderType !== renderType ||
    currLink.type !== type ||
    currLink.uri !== uri
  ) {
    if (currTab.currentLink === currTab.links.length - 1) {
      vigiState.tabs[vigiState.currentTab].currentLink += 1;

      vigiState.tabs[vigiState.currentTab].links.push({
        type,
        page,
        uri,
        renderType,
      });
    } else {
      vigiState.tabs[vigiState.currentTab].links = currTab.links.slice(
        0,
        currTab.currentLink + 1
      );

      vigiState.tabs[vigiState.currentTab].links[currTab.currentLink] = {
        type,
        page,
        uri,
        renderType,
      };
    }
  }
}
