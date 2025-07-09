export default defineNuxtRouteMiddleware(() => {
  const accessToken = useCookie('access_token')

  if (accessToken.value) {
    return navigateTo('/dashboard') // atau ke route utama kamu
  }
})
