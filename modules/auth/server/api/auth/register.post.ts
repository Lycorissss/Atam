import { RegisterSchema } from '~/types/auth/register'

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  const body = await readBody(event)
  const payload = RegisterSchema.parse(body)

  try {
    const res = await $fetch(`${config.atamsAuthUrl}/users/signup`, {
      method: 'POST',
      body: payload,
    })

    return { success: true, data: res }
  }
  catch (err: any) {
    const statusCode = err?.statusCode || 500
    const message = err?.data?.message || err?.data?.detail || 'Registrasi gagal'

    throw createError({
      statusCode,
      statusMessage: 'Register Failed',
      message,
    })
  }
})
