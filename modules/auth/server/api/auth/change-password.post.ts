// server/api/auth/change-password.post.ts
export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const config = useRuntimeConfig()
  const accessToken = getCookie(event, 'access_token')

  //   console.log('Change Password Request:', getRequestHeaders(event), body)

  try {
    const res = await $fetch(`${config.atamsAuthUrl}/users/me/change-password`, {
      method: 'POST',
      body,
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })

    return res
  }
  catch (err: any) {
    console.error('Change Password Error:', err)
    throw createError({
      statusCode: err?.statusCode || 400,
      statusMessage: 'Change Password Failed',
      message: err?.data?.message || 'Gagal mengganti password',
    })
  }
})
