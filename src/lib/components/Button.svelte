<script lang="ts">
  export let onclick = () => {};
  export let className = "";

  export let disabled: boolean = false;
</script>

<button
  class={`${disabled ? "disabled-button" : "button"}${className ? " " + className : ""}`}
  {onclick}
>
  <slot />
</button>
