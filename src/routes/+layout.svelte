<script lang="ts">
  import "../app.css";

  let sidebarOpen = true;

  document.addEventListener("keypress", (e: KeyboardEvent) => {
    if (
      ["INPUT", "TEXTAREA", "SELECT", "OPTION"].includes(
        (e.target as Element).tagName
      )
    ) {
      return;
    }
    if (e.code === "KeyQ") sidebarOpen = !sidebarOpen;
  });
</script>

<div>
  <slot />
</div>
