<script lang="ts">
  import TopBarDesktop from "$lib/components/TopBarDesktop.svelte";
  import TopBarMobile from "$lib/components/TopBarMobile.svelte";
  import { internalState, vigiState } from "$lib/state.svelte";
  import { onMount } from "svelte";
  import "../app.css";
  import { afterNavigate, beforeNavigate } from "$app/navigation";
  import { page } from "$app/state";
  import BotBar from "$lib/components/BotBar.svelte";
  import Tabs from "$lib/components/Tabs.svelte";
  import { invoke } from "@tauri-apps/api/core";
  import type { ExportedVigiState, VigiState } from "$lib/types";

  const { children } = $props();

  let browserEl: HTMLDivElement;

  //todo: make this mess better
  let pathname = "";
  onMount(() => {
    pathname = page.url.pathname;
  });
  beforeNavigate(() => {
    pathname = page.url.pathname;
  });
  afterNavigate(() => {
    if (pathname !== page.url.pathname)
      browserEl.scrollTo({ top: 0, behavior: "auto" });
  });

  document.addEventListener("keypress", (e: KeyboardEvent) => {
    if (
      ["INPUT", "TEXTAREA", "SELECT", "OPTION"].includes(
        (e.target as Element).tagName
      )
    ) {
      return;
    }
    if (e.code === "KeyQ") vigiState.sidebar_open = !vigiState.sidebar_open;
  });

  let width: number = $state(0);

  let is_desktop = $derived(width >= 1024);
  let sidebar_open = $derived(is_desktop && vigiState.sidebar_open);

  $effect(() => {
    let state: VigiState = JSON.parse(JSON.stringify(vigiState));

    let export_state: ExportedVigiState = {
      currentTab: state.currentTab,
      sidebar_open: state.sidebar_open,
      tabs: state.tabs.map(({ currentLink, id, links }) => {
        return {
          currentLink,
          links: links.map(({ type, uri, title }) => {
            return {
              type,
              uri,
              title,
            };
          }),
        };
      }),
    };

    invoke("save_state", { input: JSON.stringify(export_state) });
  });
</script>

<svelte:window bind:innerWidth={width} />

<div class="grid gap-2 w-full" class:grid-cols-6={sidebar_open}>
  {#if sidebar_open}
    <Tabs />
  {/if}
  <div class="main-window">
    {#if is_desktop}
      <TopBarDesktop />
    {:else}
      <TopBarMobile />
    {/if}
    <div
      class="browser"
      class:loading-pulse={internalState.isLoading}
      bind:this={browserEl}
    >
      {@render children()}
    </div>
    {#if !is_desktop}
      <BotBar />
    {/if}
  </div>
</div>
