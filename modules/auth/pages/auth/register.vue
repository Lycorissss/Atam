<script setup>
definePageMeta({
  layout: 'auth',
  middleware: ['guest-client'],
})
</script>

<template>
  <AtamBgSimetris class="fixed -z-10" />
  <section class="py-12 z-10 register-atam">
    <AtamCard>
      <template #header>
        <h1 class="text-3xl font-semibold text-center">
          Register
        </h1>
      </template>
      <template #content>
        <AuthRegisterForm />
      </template>
    </AtamCard>
  </section>
</template>
