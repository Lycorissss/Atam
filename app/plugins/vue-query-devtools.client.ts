// plugins/vue-query-devtools.client.ts

export default defineNuxtPlugin(async (nuxtApp) => {
  if (!process.dev)
    return // only in dev

  const { VueQueryDevtools } = await import('@tanstack/vue-query-devtools')

  nuxtApp.vueApp.component('VueQueryDevtools', VueQueryDevtools)
})
