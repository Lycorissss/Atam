export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  const body = await readBody<{ token: string }>(event)

  try {
    const res = await $fetch(`${config.atamsAuthUrl}/users/verify-email`, {
      method: 'POST',
      body,
    })

    return { success: true, data: res }
  }
  catch (err: any) {
    console.error('[Verify Email Error]', err?.data ?? err)

    const message = err?.data?.detail || err?.data?.message || 'Verifikasi gagal'
    throw createError({
      statusCode: err?.statusCode || 401,
      statusMessage: 'Verify Failed',
      message,
    })
  }
})
