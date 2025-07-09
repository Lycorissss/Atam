import type { LoginInput } from '~/types/auth/login'
import { useMutation, useQueryClient } from '@tanstack/vue-query'

export function useLogin() {
  const queryClient = useQueryClient() // ✅ DIPANGGIL di context yang valid (setup/composable)

  return useMutation({
    mutationFn: async ({ email, password }: LoginInput) => {
      const payload = new URLSearchParams()
      payload.append('username', email)
      payload.append('password', password)

      const response = await $fetch('/api/auth/login', {
        method: 'POST',
        body: payload,
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      })

      useCookie('access_token').value = response.data.access_token
      useCookie('refresh_token').value = response.data.refresh_token

      return response
    },

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['me'] }) // ✅ Sudah aman
    },
  })
}
