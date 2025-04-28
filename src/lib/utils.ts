import { state } from "./state.svelte";
import type { EngineType, TabUrl } from "./types";

export function currentTabLink() {
  return renderUrl(state.tabs[state.current_tab_index].link);
}

export function renderUrl(url: TabUrl): string {
  if (url.type === "render") {
    return renderLnk(url.renderType || "auto", url.uri);
  } else {
    return `/${url.type}/${url.uri}`;
  }
}

export function renderLnk(type: EngineType, link: string, inner?: boolean) {
  return `/render/${type}/${encodeURIComponent(
    inner
      ? new URL(link, state.tabs[state.current_tab_index].link.uri).toString()
      : link
  )}`;
}

export function formatInputUrl(urlString: string): string {
  try {
    const url = new URL(urlString);
    return decodeURI(urlString.replace(`${url.protocol}//`, ""));
  } catch (e) {
    return urlString;
  }
}
