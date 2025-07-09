export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  const refreshToken = getCookie(event, 'refresh_token')

  if (!refreshToken) {
    throw createError({
      statusCode: 401,
      statusMessage: 'Unauthorized',
      message: 'Refresh token tidak tersedia',
    })
  }

  try {
    const response = await $fetch(`${config.atamsAuthUrl}/auth/refresh`, {
      method: 'POST',
      body: { refresh_token: refreshToken },
    })

    return { success: true, data: response }
  }
  catch (err: any) {
    throw createError({
      statusCode: err?.statusCode || 401,
      statusMessage: 'Refresh Failed',
      message: err?.data?.message || 'Gagal refresh token',
    })
  }
})
