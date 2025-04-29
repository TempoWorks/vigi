import type { InternalState, VigiState } from "./types";

export const vigiState: VigiState = $state({
  currentTab: 0,
  tab_counter: 1,
  sidebar_open: true,
  tabs: [
    {
      id: 0,
      currentLink: 0,
      links: [
        {
          type: "render",
          renderType: "auto",
          uri: "gemini://geminiprotocol.net/docs/gemtext-specification.gmi",
        },
      ],
    },
  ],
});

export const internalState: InternalState = $state({
  isLoading: true,
});
