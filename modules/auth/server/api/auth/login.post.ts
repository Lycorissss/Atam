export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()

  const raw = await readBody<{ email?: string, username?: string, password: string }>(event)
  const body = {
    username: raw.username || raw.email || '',
    password: raw.password,
  }

  const payload = new URLSearchParams()
  payload.append('username', body.username)
  payload.append('password', body.password)

  try {
    const res = await $fetch(`${config.atamsAuthUrl}/auth/login`, {
      method: 'POST',
      body: payload,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    })

    return { success: true, data: res }
  }
  catch (err: any) {
    throw createError({
      statusCode: err?.statusCode || 401,
      statusMessage: 'Login Failed',
      message: err?.data?.message || 'Login gagal',
    })
  }
})
