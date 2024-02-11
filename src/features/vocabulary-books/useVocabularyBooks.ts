'use client'
import { VocabularyBook } from '@/types/vocabularyBooks'
import { postWithToken, getWithToken, deleteWithToken } from '@/utils/fetchFromAPI'

export async function listVocabularyBooks(
  userId: number | undefined,
): Promise<VocabularyBook[] | undefined> {
  const res = await getWithToken(`/api/vocabulary_books/list?user_id=${userId}}`)
  if (res.ok) {
    const data = await res.json()

    return data.vocabulary_books
  }
}

export async function deleteVocabularyBook(id: number) {
  if (!confirm('Are you sure to delete this vocabulary book?')) return

  const res = await deleteWithToken(`/api/vocabulary_books/delete/${id}`)

  if (res.ok) {
    return true
  }
  return false
}

export async function createVocabularyBook(name: string, description: string, userId: number) {
  const res = await postWithToken(`/api/vocabulary_books/create`, {
    vocabulary_book: {
      name: name,
      description: description,
      user_id: userId,
    },
  })

  if (res.ok) {
    return true
  }
  return false
}
