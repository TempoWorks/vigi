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

  prev?: TabUrl;
  next?: TabUrl;
}

export interface VigiState {
  current_tab_index: number;
  sidebar_open: boolean;
  tabs: SiteTab[];
}

export interface InternalState {
  isLoading: boolean;
}
