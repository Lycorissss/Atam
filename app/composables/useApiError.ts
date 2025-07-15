export function useApiError(error: any) {
  return { messages: [error?.data?.message || 'Terjadi kesalahan.'] }
}
