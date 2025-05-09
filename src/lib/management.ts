import type { TabType } from "$lib/types";
import {
  currentTab,
  currentLink,
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
  const currLink = currTab.links[currTab.current_link];

  if (currLink.ty !== type || currLink.uri !== uri) {
    if (currTab.current_link !== currTab.links.length - 1) {
      currTab.links = currTab.links.slice(0, currTab.current_link + 1);
    }

    currTab.links.push({
      ty: type,
      title: title || undefined,
      body,
      uri,
    });

    currTab.current_link += 1;
  }

  if (temporal.first_load) temporal.first_load = false;
  else saveState();
}

export function browserLinkManager(urn: string, title: string) {
  return () => {
    manageLink("BROWSER", urn, title);
  };
}

export function manageSidebar() {
  temporal.sidebar_open = !temporal.sidebar_open;
  saveState();
}

export function openNewTab() {
  vigi.tabs.push({
    id: vigi.tab_counter,
    current_link: 0,
    links: [newTabLink],
  });

  vigi.tab_counter += 1;

  goToTab(vigi.tabs.length - 1);
}

export function goToTab(idx: number) {
  vigi.current_tab = idx;

  goto(innerURN(currentLink()));
}

export function closeTab(idx: number) {
  const changed = idx === vigi.current_tab;

  if (vigi.tabs.length === 1) {
    vigi.tabs[0].current_link = 0;
    vigi.tabs[0].links = [newTabLink];

    goto("/browser/main");
  } else {
    vigi.tabs.splice(idx, 1);

    if (vigi.current_tab >= idx) {
      vigi.current_tab -= 1;

      if (changed) goToTab(vigi.current_tab);
    }
  }
}
