export default defineNuxtRouteMiddleware(async () => {
  const token = useCookie('access_token')

  // Jika token sudah ada, tidak perlu refresh
  if (token.value)
    return

  // Coba refresh token
  const refreshed = await useRefreshToken()

  // Kalau gagal refresh, redirect ke login
  if (!refreshed) {
    return navigateTo('/auth/login')
  }
})
