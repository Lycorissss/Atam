export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  const body = await readBody<{
    token: string
    new_password: string
    confirm_password: string
  }>(event)

  try {
    const res = await $fetch(`${config.atamsAuthUrl}/users/reset-password`, {
      method: 'POST',
      body,
    })

    return res
  }
  catch (err: any) {
    throw createError({
      statusCode: err?.statusCode || 400,
      message: err?.data?.message || 'Gagal reset password',
    })
  }
})
