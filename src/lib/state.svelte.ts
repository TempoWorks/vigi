import type { InternalState, VigiState } from "./types";

export const vigiState: VigiState = $state({
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

export const internalState: InternalState = $state({
  isLoading: true,
});
