import type { Page } from "@txtdot/dalet";

export interface StateTab {
  title: string;
  url: string;
  id: number;
}

export interface VigiState {
  current_tab_index: number;
  tabs: StateTab[];
  favorites_tabs: StateTab[];

  top_bar_input: string;
  current_data?: Page;
}
