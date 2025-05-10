<script lang="ts">
  export let className = "";
</script>

<div class="thin-block{className ? ` ${className}` : ''}">
  <slot />
</div>
