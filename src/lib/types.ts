import type { Tag } from "@txtdot/dalet";

export type TabType = "render" | "browser";
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

export interface VigiState {
  currentTab: number;
  tabCounter: number;
  sidebar_open: boolean;
  tabs: SiteTab[];
}

export interface InternalState {
  isLoading: boolean;
  topBarOpen: boolean;
}

export interface ExportedVigiState {
  currentTab: number;
  sidebar_open: boolean;
  tabs: ExportedSiteTab[];
}

export interface ExportedSiteTab {
  currentLink: number;
  links: TabLink[];
}
