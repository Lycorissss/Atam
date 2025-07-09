import { z } from 'zod'

export const RegisterSchema = z
  .object({
    email: z.string().email('Email tidak valid'),
    username: z.string().min(3, 'Minimal 3 karakter'),
    password: z
      .string()
      .min(8, 'Minimal 8 karakter')
      .regex(/[A-Z]/, 'Harus mengandung huruf besar')
      .regex(/[!@#$%^&*(),.?":{}|<>]/, 'Harus mengandung karakter spesial'),
    confirm_password: z.string().min(8),
    metadata: z.object({
      first_name: z.string().min(1, 'Wajib diisi'),
      last_name: z.string().min(1, 'Wajib diisi'),
    }),
  })
  .refine(data => data.password === data.confirm_password, {
    message: 'Password tidak cocok',
    path: ['confirm_password'],
  })

export type RegisterInput = z.infer<typeof RegisterSchema>
