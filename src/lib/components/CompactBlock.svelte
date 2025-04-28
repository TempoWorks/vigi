<script lang="ts">
  export let className = "";
</script>

<div class="compact-block{className ? ` ${className}` : ''}">
  <slot />
</div>
