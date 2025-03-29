import type { VigiState } from "./types";

export const state: VigiState = $state({
  current_tab_index: 0,
  tabs: [],
  favorites_tabs: [],
});
