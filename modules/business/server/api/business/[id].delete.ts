export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  const id = getRouterParam(event, 'id')

  console.log('here', id)

  return await $fetch(`${config.atamsUrl}/businesses/${id}`, {
    method: 'DELETE',
  })
})
