export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  const body = await readBody<{ refresh_token?: string }>(event)

  try {
    await $fetch(`${config.atamsAuthUrl}/auth/logout`, {
      method: 'POST',
      body,
    })

    return { success: true }
  }
  catch (err: any) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Logout Failed',
      message: 'Gagal menghapus token',
    })
  }
})
