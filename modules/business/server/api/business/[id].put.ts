export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  const id = getRouterParam(event, 'id')
  const body = await readBody(event)

  return await $fetch(`${config.atamsUrl}/businesses/${id}`, {
    method: 'PUT',
    body,
  })
})
