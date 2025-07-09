export async function useRefreshToken() {
  const refresh = useCookie('refresh_token')

  // 🚫 Jika token sudah tidak ada
  if (!refresh.value) {
    console.warn('[RefreshToken] Tidak ada refresh_token di cookie')
    useLogout().mutate()
    return null
  }

  try {
    const { data }: any = await $fetch('/api/auth/refresh', { method: 'POST' })

    const access = useCookie('access_token')
    access.value = data.access_token

    return data.access_token
  }
  catch (err: any) {
    console.warn('[RefreshToken Failed]', err)
    useLogout().mutate()
    return null
  }
}
