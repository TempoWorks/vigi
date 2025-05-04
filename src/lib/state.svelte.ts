import type { TemporalState, VigiState } from "./types";

export const vigi: VigiState = $state({
  currentTab: 0,
  tabCounter: 1,
  sidebar_open: true,
  tabs: [
    {
      id: 0,
      currentLink: 0,
      links: [
        {
          ty: "RENDER",
          renderType: "auto",
          uri: "gemini://geminiprotocol.net/docs/gemtext-specification.gmi",
        },
      ],
    },
  ],
});

export const temporal: TemporalState = $state({
  loading: false,
  topBarOpen: false,
  firstLoad: true,
});
