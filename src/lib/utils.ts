import type { EngineType } from "./types";

export function convertLink(type: EngineType, link: string) {
  return `/render/${type}/${encodeURIComponent(link)}`;
}
