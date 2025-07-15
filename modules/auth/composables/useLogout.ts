import { useMutation } from '@tanstack/vue-query'

export function useLogout() {
  return useMutation({
    mutationFn: async () => {
      const refreshToken = useCookie('refresh_token').value

      console.log('[Logout] Menghapus token...', refreshToken)
      if (!refreshToken)
        throw new Error('Refresh token tidak ditemukan.')

      try {
        await $fetch('/api/auth/logout', {
          method: 'POST',
          body: { refresh_token: refreshToken },
        })

        console.log('[Logout] Token berhasil dihapus di backend.')
      }
      catch (err) {
        console.warn('[Logout] Gagal menghapus token di backend:', err)
        // tetap lanjut hapus token di client
      }

      // Tetap hapus token dari client
      useCookie('access_token').value = null
      useCookie('refresh_token').value = null
    },
  })
}
