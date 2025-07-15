<script setup>
import ToastContainer from './components/atam/ToastContainer.vue'
</script>

<template>
  <div class="font-sans antialiased ">
    <NuxtLayout />
    <ToastContainer />
    <ClientOnly>
      <VueQueryDevtools :initial-is-open="true" />
    </ClientOnly>
  </div>
</template>
