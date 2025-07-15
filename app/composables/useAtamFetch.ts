import { handleApiError } from '~/utils/http'

interface AtamFetchOptions<T> extends Omit<FetchOptions<'json'>, 'method' | 'body'> {
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE'
  body?: any
  params?: Record<string, any>
  showSuccess?: boolean
  showError?: boolean
  transform?: (data: any) => T
}

export function useAtamFetch<T = any>(
  path: string, // hanya path relatif, misalnya "/business/1"
  options: AtamFetchOptions<T> = {},
) {
  const { showToast } = useAtamToast()

  return $fetch<{ data: T, message?: string }>(`/api${path}`, {
    method: options.method || 'GET',
    body: options.body,
    query: options.params,
    ...options,

    async onResponse({ response }) {
      const message = response._data?.message
      if (message && options.showSuccess !== false) {
        showToast('Success!', 'success')
      }

      if (typeof options.transform === 'function') {
        response._data.data = options.transform(response._data.data)
      }
    },

    async onResponseError({ response }) {
      const messages = handleApiError(response)
      const message = messages[0] || 'Terjadi kesalahan.'

      if (options.showError !== false) {
        showToast('Error!', 'error')
      }

      throw new Error(message)
    },
  })
}
