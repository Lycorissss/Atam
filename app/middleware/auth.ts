// middleware/auth.global.ts
import { defineNuxtRouteMiddleware, navigateTo } from '#app'

export default defineNuxtRouteMiddleware(async () => {
  try {
    const { data } = await useFetch('/api/auth/me', {
      method: 'GET',
      credentials: 'include',
    })

    // If no valid user is returned, treat as unauthenticated
    if (!data.value || !Array.isArray(data.value.data) || !data.value.data[0]) {
      return navigateTo('/')
    }
  }
  catch (error) {
    // If the API call fails (e.g., invalid token), redirect to login
    return navigateTo('/')
  }
})
