import type { Page } from "@txtdot/dalet";

export type TabType = "render" | "browser";
export interface SiteTab {
  id: number;
  currentLink: number;
  links: TabLink[];
}

export interface TabLink {
  page?: Page;

  type: TabType;
  uri: string;
}

export interface VigiState {
  currentTab: number;
  sidebar_open: boolean;
  tabs: SiteTab[];
}

export interface InternalState {
  isLoading: boolean;
}
