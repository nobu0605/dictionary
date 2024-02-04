import { z } from 'zod'

export const signUpSchema = z
  .object({
    name: z.string().min(1, { message: 'Please enter your name.' }),
    email: z.string().email(),
    password: z
      .string()
      .min(8, { message: 'Please enter a password of 8 digits or more.' })
      .regex(/^[a-zA-Z0-9]+$/, {
        message: 'Please enter uppercase letters, lowercase letters, and numbers.',
      }),
    password_confirmation: z
      .string()
      .min(8, { message: 'Please enter a password of 8 digits or more.' })
      .regex(/^[a-zA-Z0-9]+$/, {
        message: 'Please enter uppercase letters, lowercase letters, and numbers.',
      }),
  })
  .refine((data) => data.password === data.password_confirmation, {
    message: "Passwords don't match",
    path: ['password_confirmation'],
  })

export type SignUpSchemaType = z.infer<typeof signUpSchema>
