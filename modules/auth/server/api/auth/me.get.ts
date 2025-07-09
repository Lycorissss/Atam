export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  const accessToken = getCookie(event, 'access_token')

  if (!accessToken) {
    throw createError({ statusCode: 401, message: 'Unauthorized' })
  }

  try {
    const me = await $fetch(`${config.atamsAuthUrl}/users/me`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })

    return me
  }
  catch (err: any) {
    throw createError({
      statusCode: err?.statusCode || 401,
      statusMessage: 'Failed to Fetch User',
      message: err?.data?.message || 'Autentikasi gagal',
    })
  }
})
