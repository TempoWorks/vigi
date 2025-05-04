import type { Tag } from "@txtdot/dalet";

export type TabType = "RENDER" | "BROWSER";

export interface VigiState {
  current_tab: number;
  tab_counter: number;
  sidebar_open: boolean;
  tabs: SiteTab[];
}

export interface SiteTab {
  id: number;
  current_link: number;
  links: TabLink[];
}

export interface TabLink {
  title?: string;
  body?: Tag[];

  ty: TabType;
  uri: string;
}

export interface TemporalState {
  loading: boolean;
  top_bar_open: boolean;
  first_load: boolean;
}
