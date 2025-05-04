import type { TabType } from "$lib/types";
import {
  currentTab,
  currentTabLink,
  saveState,
  innerURN,
  newTabLink,
} from "$lib/utils";
import type { Tag } from "@txtdot/dalet";
import { temporal, vigi } from "./state.svelte";
import { goto } from "$app/navigation";

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
      vigi.tabs[vigi.currentTab].links = currTab.links.slice(
        0,
        currTab.currentLink + 1
      );
    }

    vigi.tabs[vigi.currentTab].links.push({
      type,
      title: title || undefined,
      body,
      uri,
    });

    vigi.tabs[vigi.currentTab].currentLink += 1;
  }

  if (temporal.firstLoad) temporal.firstLoad = false;
  else saveState();
}

export function browserLinkManager(urn: string, title: string) {
  return () => {
    manageLink("browser", urn, title);
  };
}

export function manageSidebar() {
  vigi.sidebar_open = !vigi.sidebar_open;
  saveState();
}

export function openNewTab() {
  vigi.tabs.push({
    id: vigi.tabCounter,
    currentLink: 0,
    links: [newTabLink],
  });

  vigi.tabCounter += 1;

  goToTab(vigi.tabs.length - 1);
}

export function goToTab(idx: number) {
  vigi.currentTab = idx;

  goto(
    innerURN(
      vigi.tabs[vigi.currentTab].links[vigi.tabs[vigi.currentTab].currentLink]
    )
  );
}

export function closeTab(idx: number) {
  const changed = idx === vigi.currentTab;

  if (vigi.tabs.length === 1) {
    vigi.tabs[0].currentLink = 0;
    vigi.tabs[0].links = [newTabLink];

    goto("/browser/main");
  } else {
    vigi.tabs.splice(idx, 1);

    if (vigi.currentTab >= idx) {
      vigi.currentTab -= 1;

      if (changed) goToTab(vigi.currentTab);
    }
  }
}
