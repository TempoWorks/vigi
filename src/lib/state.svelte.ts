import type { TemporalState, VigiState } from "./types";

export const vigi: VigiState = $state({
  current_tab: 0,
  tab_counter: 1,
  sidebar_open: true,
  tabs: [
    {
      id: 0,
      current_link: 0,
      links: [
        {
          ty: "RENDER",
          render_type: "auto",
          uri: "gemini://geminiprotocol.net/docs/gemtext-specification.gmi",
        },
      ],
    },
  ],
});

export const temporal: TemporalState = $state({
  loading: false,
  top_bar_open: false,
  first_load: true,
});
