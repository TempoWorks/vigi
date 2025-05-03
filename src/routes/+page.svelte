<script lang="ts">
  import { goto } from "$app/navigation";
  import { vigiState } from "$lib/state.svelte";
  import type { ExportedVigiState } from "$lib/types";
  import { currentTabInnerURN } from "$lib/utils";
  import { invoke } from "@tauri-apps/api/core";
  import { onMount } from "svelte";

  onMount(async () => {
    try {
      const exported_state: ExportedVigiState = JSON.parse(
        await invoke("get_state")
      );

      vigiState.currentTab = exported_state.currentTab;
      vigiState.sidebar_open = exported_state.sidebar_open;

      let tabCounter = 0;

      vigiState.tabs = exported_state.tabs.map(({ currentLink, links }) => {
        return { currentLink, links, id: tabCounter++ };
      });

      vigiState.tabCounter = tabCounter;
    } catch {}

    goto(currentTabInnerURN());
  });
</script>
