<script setup lang="ts">
definePageMeta({
  layout: 'auth',
  middleware: ['guest-client'],
})
</script>

<template>
  <section class="max-w-md mx-auto py-20">
    <h1 class="text-2xl font-bold text-center mb-8">
      Login
    </h1>
    <AuthLoginForm />
  </section>
</template>
