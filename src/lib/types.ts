import type { Tag } from "@txtdot/dalet";

export type TabType = "render" | "browser";

export interface VigiState {
  currentTab: number;
  tabCounter: number;
  sidebar_open: boolean;
  tabs: SiteTab[];
}

export interface SiteTab {
  id: number;
  currentLink: number;
  links: TabLink[];
}

export interface TabLink {
  title?: string;
  body?: Tag[];

  type: TabType;
  uri: string;
}

export interface TemporalState {
  loading: boolean;
  topBarOpen: boolean;
  firstLoad: boolean;
}

export interface PermanentState {
  currentTab: number;
  sidebar_open: boolean;
  tabs: PermanentSiteTab[];
}

export interface PermanentSiteTab {
  currentLink: number;
  links: TabLink[];
}
