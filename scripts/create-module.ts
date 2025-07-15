import { mkdirSync, writeFileSync, existsSync } from 'fs'
import { join } from 'path'

const moduleName = process.argv[2]

if (!moduleName) {
  console.error('❌ Masukkan nama modul: npm run create-module <modulename>')
  process.exit(1)
}

const pascalCase = moduleName.charAt(0).toUpperCase() + moduleName.slice(1)
const pluralPath = moduleName.endsWith('s') ? moduleName : moduleName + 's'

const root = (p: string) => join(process.cwd(), p)

function createFile(path: string, content: string) {
  const normalizedPath = path.replace(/\\/g, '/')
  const dir = normalizedPath.includes('/')
    ? normalizedPath.split('/').slice(0, -1).join('/')
    : null

  if (dir && !existsSync(root(dir))) {
    mkdirSync(root(dir), { recursive: true })
  }

  writeFileSync(root(path), content)
}

// 1. nuxt.config.ts
createFile(`modules/${moduleName}/nuxt.config.ts`, 
`export default defineNuxtConfig({
  extends: [],
})
`)

// 2. constants/<moduleName>Keys.ts
createFile(`modules/${moduleName}/constants/${moduleName}Keys.ts`, 
`export const ${moduleName}Keys = {
  all: () => ['${moduleName}'],
  lists: () => ['${moduleName}', 'list'],
  list: () => ['${moduleName}', 'list'],
  details: () => ['${moduleName}', 'detail'],
  detail: (id: number) => ['${moduleName}', 'detail', id],
}
`)

// 3. api/use<ModuleName>Api.ts
createFile(`modules/${moduleName}/api/use${pascalCase}Api.ts`,
`import { useAtamFetch } from '~/composables/useAtamFetch'

export function use${pascalCase}Api() {
  return {
    getList: () => useAtamFetch('/${pluralPath}'),
    getById: (id: number) => useAtamFetch('/${pluralPath}/' + id),
    create: (payload: any) => useAtamFetch('/${pluralPath}', { method: 'POST', body: payload }),
    update: (id: number, payload: any) => useAtamFetch('/${pluralPath}/' + id, { method: 'PUT', body: payload }),
    remove: (id: number) => useAtamFetch('/${pluralPath}/' + id, { method: 'DELETE' }),
  }
}
`)

// 4. composables
const composables = [
  ['use' + pascalCase + 'List.ts', `${moduleName}Keys.list()`, 'query'],
  ['use' + pascalCase + 'Detail.ts', `${moduleName}Keys.detail(id)`, 'query'],
  ['useCreate' + pascalCase + '.ts', '', 'mutation'],
  ['useUpdate' + pascalCase + '.ts', '', 'mutationUpdate'],
  ['useDelete' + pascalCase + '.ts', '', 'mutationDelete'],
]

composables.forEach(([file, key, type]) => {
  let content = ''
  const base = `modules/${moduleName}/composables/${file}`

  if (type === 'query') {
    content = `import { useQuery } from '@tanstack/vue-query'
import { use${pascalCase}Api } from '../api/use${pascalCase}Api'
import { ${moduleName}Keys } from '../constants/${moduleName}Keys'

export function ${file.replace('.ts', '')}() {
  const api = use${pascalCase}Api()
  return useQuery({
    queryKey: ${key},
    queryFn: () => api.getList().then(res => res.data),
  })
}
`
  } else if (type === 'mutation') {
    content = `import { useMutation, useQueryClient } from '@tanstack/vue-query'
import { useRouter } from 'vue-router'
import { use${pascalCase}Api } from '../api/use${pascalCase}Api'
import { ${moduleName}Keys } from '../constants/${moduleName}Keys'

export function ${file.replace('.ts', '')}() {
  const api = use${pascalCase}Api()
  const router = useRouter()
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (payload: any) => api.create(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ${moduleName}Keys.list() })
      router.push('/${moduleName}')
    },
  })
}
`
  } else if (type === 'mutationUpdate') {
    content = `import { useMutation, useQueryClient } from '@tanstack/vue-query'
import { useRouter } from 'vue-router'
import { use${pascalCase}Api } from '../api/use${pascalCase}Api'
import { ${moduleName}Keys } from '../constants/${moduleName}Keys'

export function ${file.replace('.ts', '')}(id: number) {
  const api = use${pascalCase}Api()
  const router = useRouter()
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (payload: any) => api.update(id, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ${moduleName}Keys.list() })
      queryClient.invalidateQueries({ queryKey: ${moduleName}Keys.detail(id) })
      router.push('/${moduleName}')
    },
  })
}
`
  } else if (type === 'mutationDelete') {
    content = `import { useMutation, useQueryClient } from '@tanstack/vue-query'
import { use${pascalCase}Api } from '../api/use${pascalCase}Api'
import { ${moduleName}Keys } from '../constants/${moduleName}Keys'

export function ${file.replace('.ts', '')}() {
  const api = use${pascalCase}Api()
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (id: number) => api.remove(id),
    onSuccess: (_, id) => {
      queryClient.invalidateQueries({ queryKey: ${moduleName}Keys.list() })
      queryClient.invalidateQueries({ queryKey: ${moduleName}Keys.detail(id) })
    },
  })
}
`
  }

  createFile(base, content)
})

// 5. server/api/<plural>/*.ts
const apiPath = `modules/${moduleName}/server/api/${pluralPath}`

const routes = [
  ['index.get.ts', 'GET'],
  ['index.post.ts', 'POST'],
  ['[id].get.ts', 'GET', true],
  ['[id].put.ts', 'PUT', true],
  ['[id].delete.ts', 'DELETE', true],
]

routes.forEach(([file, method, useId]) => {
  const body = method === 'POST' || method === 'PUT' ? 'const body = await readBody(event)\n' : ''
  const idLine = useId ? `const id = getRouterParam(event, 'id')\n` : ''
  const path = useId ? `\${id}` : ''
  const payload = method === 'POST' || method === 'PUT' ? ',\n    body' : ''

  createFile(`${apiPath}/${file}`,
`export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  ${idLine}${body}
  return await $fetch(\`\${config.atamsUrl}/${pluralPath}${useId ? '/\${id}' : ''}\`, {
    method: '${method}'${payload}
  })
})
`)
})

console.log(`✅ Modul "${moduleName}" berhasil dibuat lengkap!`)
