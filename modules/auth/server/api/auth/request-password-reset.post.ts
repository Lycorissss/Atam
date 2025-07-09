export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  const body = await readBody<{ email: string }>(event)

  try {
    const res = await $fetch(`${config.atamsAuthUrl}/users/request-password-reset`, {
      method: 'POST',
      body,
    })
    return res
  } catch (err: any) {
    throw createError({
      statusCode: err?.statusCode || 400,
      message: err?.data?.message || 'Gagal request reset password',
    })
  }
})
