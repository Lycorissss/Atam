export function handleApiError(error: any): string[] {
  const data = error?.data || error?.response?._data
  if (Array.isArray(data?.messages))
    return data.messages
  if (typeof data?.message === 'string')
    return [data.message]
  if (typeof error?.message === 'string')
    return [error.message]
  return ['Terjadi kesalahan tak terduga']
}
