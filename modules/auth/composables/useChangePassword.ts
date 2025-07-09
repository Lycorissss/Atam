// ~/composables/useChangePassword.ts
import { useMutation } from '@tanstack/vue-query'

export function useChangePassword() {
  return useMutation({
    mutationFn: async (payload: {
      current_password: string
      new_password: string
      confirm_new_password: string
    }) => {
      return await $fetch('/api/auth/change-password', {
        method: 'POST',
        body: payload,
      })
    },
  })
}
