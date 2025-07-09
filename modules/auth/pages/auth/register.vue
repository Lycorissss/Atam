<script setup>
definePageMeta({
  layout: 'auth',
  middleware: ['guest-client'],
})
</script>

<template>
  <section class="py-12">
    <h1 class="text-3xl font-semibold text-center mb-8">
      Register
    </h1>
    <AuthRegisterForm />
  </section>
</template>
