export type EngineType = "auto";
export type TabType = "render" | "browser";
export interface SiteTab {
  id: number;
  link: TabUrl;
  title?: string;
  description?: string;
}

export interface TabUrl {
  type: TabType;
  uri: string;
  renderType?: EngineType;
}

export interface VigiState {
  current_tab_index: number;
  sidebar_open: boolean;
  top_bar_input: string;
  tabs: SiteTab[];
}
