<script lang="ts">
  import { page } from "$app/state";
  import CompassLoop from "$lib/icons/CompassLoop.svelte";
  import type { DrovaError } from "$lib/types";

  let error: DrovaError = page.error as DrovaError;
</script>

<div
  class="flex max-lg:flex-col items-center lg:justify-center h-full gap-5 mx-auto"
>
  <CompassLoop width="128" height="128" class="opacity-50" />

  <div class="flex flex-col">
    <h1 class="text-4xl font-black max-lg:text-center">
      {page.status}
      {error.message}
    </h1>
    <div class="text-xl font-semibold opacity-50 max-lg:text-center">
      {#if error.body}
        {error.body}
      {/if}
    </div>
  </div>
</div>
