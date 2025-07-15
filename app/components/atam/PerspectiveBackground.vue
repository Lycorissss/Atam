<script setup>
// No JS needed — clean & performant
</script>

<template>
  <div class="absolute inset-0 z-0 bg-white dark:bg-black">
    <div class="w-full h-full grid-bg pointer-events-none" />
  </div>
</template>

<style scoped>
.grid-bg {
  background-image:
    linear-gradient(to right, #00000020 1px, transparent 1px),
    linear-gradient(to bottom, #00000020 1px, transparent 1px);
  background-size: 60px 60px;
  background-position: top left;
}
@media (prefers-color-scheme: dark) {
  .grid-bg {
    background-image:
      linear-gradient(to right, #ffffff10 1px, transparent 1px),
      linear-gradient(to bottom, #ffffff10 1px, transparent 1px);
  }
}
</style>
