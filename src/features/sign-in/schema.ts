import { z } from 'zod'

// TODO add strict validation
export const signInSchema = z.object({
  email: z.string().email(),
  password: z
    .string()
    .min(8, { message: 'Please enter a password of 8 digits or more.' })
    .regex(/^[a-zA-Z0-9]+$/, {
      message: 'Please enter uppercase letters, lowercase letters, and numbers.',
    }),
})

export type SignInSchemaType = z.infer<typeof signInSchema>
