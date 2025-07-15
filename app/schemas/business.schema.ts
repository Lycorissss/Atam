import { z } from 'zod'

export const businessSchema = z.object({
  name: z.string().min(3, 'Nama wajib diisi').max(200),
  slug: z.string().min(3).max(100).optional(),
  type: z.enum(['retail', 'service', 'manufacturing', 'technology', 'hospitality', 'healthcare', 'education', 'other']),
})

export type BusinessFormInput = z.infer<typeof businessSchema>
