export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  const id = getRouterParam(event, 'id')

  return await $fetch(`${config.atamsUrl}/businesses/${id}`, {
    method: 'GET',
  })
})
