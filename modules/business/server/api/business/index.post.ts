export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  const body = await readBody(event)

  return await $fetch(`${config.atamsUrl}/businesses`, {
    method: 'POST',
    body,
  })
})
