export type EngineType = "auto";

export interface SiteTab {
  title?: string;
  description?: string;
  url: string;
  id: number;
}

export interface VigiState {
  current_tab_index: number;
  sidebar_open: boolean;
  tabs: SiteTab[];
}
