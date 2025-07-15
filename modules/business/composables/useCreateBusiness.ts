import type { BusinessFormInput } from '~/schemas/business.schema'
import { useMutation, useQueryClient } from '@tanstack/vue-query'
import { useRouter } from 'vue-router'
import { useBusinessApi } from '../api/business'
import { businessKeys } from '../constants/businessKeys'

export function useCreateBusiness() {
  const api = useBusinessApi()
  const queryClient = useQueryClient()
  const router = useRouter()

  return useMutation({
    mutationFn: (payload: BusinessFormInput) => api.create(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: businessKeys.list() })
      router.push('/business')
    },
  })
}
