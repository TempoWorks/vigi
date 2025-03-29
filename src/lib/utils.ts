import { state } from "./state.svelte";
import type { EngineType } from "./types";

export function renderLnk(type: EngineType, link: string) {
  return `/render/${type}/${encodeURIComponent(
    new URL(link, state.tabs[state.current_tab_index].url).toString()
  )}`;
}
