// middleware/guest.ts
import { defineNuxtRouteMiddleware, navigateTo, useCookie } from '#app'

export default defineNuxtRouteMiddleware(() => {
  const token = useCookie('auth-token') // Same key used in login

  // If already logged in, redirect to dashboard or home
  if (token.value) {
    return navigateTo('/admin/home')
  }
})
