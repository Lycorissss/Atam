import { useQuery } from '@tanstack/vue-query'
import { useBusinessApi } from '../api/business'
import { businessKeys } from '../constants/businessKeys'

export function useBusinessList() {
  const api = useBusinessApi()

  return useQuery({
    queryKey: businessKeys.list(),
    queryFn: () => api.getList().then(res => res.data),
    staleTime: 1000 * 60, // 1 menit
  })
}
