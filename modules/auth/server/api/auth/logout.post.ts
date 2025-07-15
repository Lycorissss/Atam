export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  const body = await readBody<{ refresh_token?: string }>(event)

  if (!body.refresh_token) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Logout Failed',
      message: 'Refresh token tidak ditemukan.',
    })
  }

  try {
    await $fetch(`${config.atamsAuthUrl}/auth/logout`, {
      method: 'POST',
      body: {
        all_sessions: false,
        refresh_token: body.refresh_token,
      },
      headers: {
        'Content-Type': 'application/json',
      },
    })

    return { success: true }
  }
  catch (err: any) {
    console.warn('[Logout Backend Error]', err)
    console.error('[Logout Backend Error]', err?.data || err)
    throw createError({
      statusCode: err?.statusCode || 400,
      statusMessage: 'Logout Failed',
      message: err?.data?.message || 'Logout gagal di backend',
    })
  }
})
