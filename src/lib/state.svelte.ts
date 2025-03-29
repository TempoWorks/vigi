import type { VigiState } from "./types";

export const state: VigiState = $state({
  current_tab_index: 0,
  sidebar_open: true,
  tabs: [
    {
      id: 0,
      url: "gemini://geminiprotocol.net/docs/gemtext-specification.gmi",
      description: "test",
      title: "test",
    },
  ],
});
