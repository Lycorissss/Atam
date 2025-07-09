// composables/useLogout.ts
import { useMutation } from '@tanstack/vue-query'

export function useLogout() {
  return useMutation({
    mutationFn: async () => {
      const refreshToken = useCookie('refresh_token').value

      if (!refreshToken)
        throw new Error('Refresh token tidak ditemukan.')

      await $fetch('/api/auth/logout', {
        method: 'POST',
        body: { refresh_token: refreshToken },
      })

      // Hapus token di client
      useCookie('access_token').value = null
      useCookie('refresh_token').value = null
    },
  })
}
