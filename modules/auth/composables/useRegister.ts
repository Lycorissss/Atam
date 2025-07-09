import type { RegisterInput } from '~/types/auth/register'
import { useMutation } from '@tanstack/vue-query'

export function useRegister() {
  return useMutation({
    mutationFn: async (payload: RegisterInput) => {
      return await $fetch('/api/auth/register', {
        method: 'POST',
        body: payload,
      })
    },
  })
}
