import { useMutation, useQueryClient } from '@tanstack/vue-query'
import { useRouter } from 'vue-router'
import { useBusinessApi } from '../api/business'
import { businessKeys } from '../constants/businessKeys'

export function useDeleteBusiness() {
  const api = useBusinessApi()
  const queryClient = useQueryClient()
  const router = useRouter()

  return useMutation({
    mutationFn: (id: number) => api.remove(id),
    onSuccess: (_, id) => {
      queryClient.invalidateQueries({ queryKey: businessKeys.list() })
      queryClient.invalidateQueries({ queryKey: businessKeys.detail(id) })
      router.push('/business')
    },
  })
}
