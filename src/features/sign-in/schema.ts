import { z } from 'zod'

// TODO add strict validation
export const signInSchema = z.object({
  name: z.string().min(1, { message: '名前を入力してください' }),
  email: z.string().email(),
  password: z
    .string()
    .min(8, { message: '8桁以上のパスワードを入力してください' })
    .regex(/^[a-zA-Z0-9]+$/, {
      message: '英大文字、英小文字、数字で入力してください',
    }),
  confirmPassword: z
    .string()
    .min(8, { message: '8桁以上のパスワードを入力してください' })
    .regex(/^[a-zA-Z0-9]+$/, {
      message: '英大文字、英小文字、数字で入力してください',
    }),
})

export type SignInSchemaType = z.infer<typeof signInSchema>
