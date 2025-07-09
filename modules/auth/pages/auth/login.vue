<script setup lang="ts">
definePageMeta({
  layout: 'auth',
  middleware: ['guest-client'],
})
</script>

<template>
  <section class="max-w-md mx-auto py-20 ">
    <AtamCard>
      <template #header>
        <h1 class="text-2xl font-bold text-center mb-8">
          Login
        </h1>
      </template>
      <template #content>
        <AuthLoginForm />
      </template>
      <template #footer>
        <p class="text-center mt-4 text-sm text-gray-500">
          <NuxtLink to="/auth/forgot-password" class="text-primary-600 hover:underline">
            Lupa password?
          </NuxtLink>
        </p>
      </template>
    </AtamCard>
  </section>
</template>
