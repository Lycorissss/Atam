import { useQuery } from '@tanstack/vue-query'

export function useAuthState() {
  const accessToken = useCookie('access_token')

  return useQuery({
    queryKey: ['me'],
    queryFn: async () => {
      const res = await $fetch('/api/auth/me')
      return res
    },
    enabled: computed(() => !!accessToken.value),
    staleTime: 1000 * 60 * 5, // 5 minutes
    retry: false,
  })
}
