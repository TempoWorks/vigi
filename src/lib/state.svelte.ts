import type { InternalState, VigiState } from "./types";

export const state: VigiState = $state({
  current_tab_index: 0,
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

export const internal_state: InternalState = $state({
  is_loading: true,
});
