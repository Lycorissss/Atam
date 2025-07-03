<script setup>

</script>

<template>
  <div class="font-sans antialiased ">
    <NuxtLayout />
    <ClientOnly>
      <VueQueryDevtools :initial-is-open="true" />
    </ClientOnly>
  </div>
</template>
