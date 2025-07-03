<script setup>
definePageMeta({
  layout: 'error',
})

useHead({
  title: 'Page Not Found - Nuxt Volt',
  meta: [
    { name: 'description', content: 'The page you are looking for could not be found.' },
  ],
})
</script>

<template>
  <div class="flex items-center justify-center min-h-screen bg-gray-50 dark:bg-slate-950">
    <div class="text-center">
      <h1 class="text-6xl font-bold text-slate-700 dark:text-white mb-4">
        404
      </h1>
      <p class="text-xl text-slate-500 dark:text-slate-400 mb-8">
        Oops! The page you're looking for doesn't exist.
      </p>
      <NuxtLink
        to="/"
        class="inline-block px-6 py-2 text-sm font-semibold text-white bg-blue-500 rounded-lg hover:bg-blue-600 transition-colors"
      >
        Go Back Home
      </NuxtLink>
    </div>
  </div>
</template>
