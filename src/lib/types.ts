export interface StateTab {
  title?: string;
  description?: string;
  url: string;
  id: number;
}

export interface VigiState {
  current_tab_index: number;
  tabs: StateTab[];
  favorites_tabs: StateTab[];
}
