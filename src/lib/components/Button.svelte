<script>
  export let onclick = () => {};
  export let className = "";
</script>

<button class={`button${className ? " " + className : ""}`} {onclick}>
  <slot />
</button>
