export default defineNuxtRouteMiddleware(() => {
  const accessToken = useCookie('access_token')

  if (accessToken.value) {
    return navigateTo('/example') // atau ke route utama kamu
  }
})
