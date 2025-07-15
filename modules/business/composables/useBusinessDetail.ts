import { useQuery } from '@tanstack/vue-query'
import { useBusinessApi } from '../api/business'
import { businessKeys } from '../constants/businessKeys'

export function useBusinessDetail(id: number) {
  const api = useBusinessApi()

  return useQuery({
    queryKey: businessKeys.detail(id),
    queryFn: () => api.getById(id).then(res => res.data),
    enabled: !!id,
  })
}
