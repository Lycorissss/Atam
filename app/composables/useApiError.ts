// ~/composables/useApiError.ts
export function useApiError(error: unknown) {
  const messages: string[] = []

  const data = (error as any)?.data
  const detail = data?.detail
  const message = data?.message || (error as any)?.message

  if (Array.isArray(detail)) {
    detail.forEach((d) => {
      if (typeof d === 'object' && 'msg' in d)
        messages.push(d.msg)
      else if (typeof d === 'string')
        messages.push(d)
    })
  }
  else if (typeof detail === 'string') {
    messages.push(detail)
  }
  else if (typeof message === 'string') {
    messages.push(message)
  }

  return {
    messages,
    first: messages[0] ?? 'Terjadi kesalahan',
  }
}
