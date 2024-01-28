import { z } from 'zod'

export const vocabularyBooksSchema = z.object({
  name: z.string().min(1, 'Please enter a name.'),
  description: z.string().optional(),
})

export type VocabularyBooksSchemaType = z.infer<typeof vocabularyBooksSchema>
