import type { VigiState } from "./types";

export const state: VigiState = $state({
  current_tab_index: 0,
  top_bar_input: "gemini://geminiprotocol.net/docs/gemtext-specification.gmi",
  tab_counter: 1,
  sidebar_open: true,
  tabs: [
    {
      id: 0,
      link: {
        type: "render",
        uri: "gemini://geminiprotocol.net/docs/gemtext-specification.gmi",
      },
    },
  ],
});
