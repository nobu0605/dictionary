'use client'
import { Result } from '@/types/word'
import { postWithToken } from '@/utils/fetchFromAPI'

export async function addWordToVocabularyBook(
  wordResult: Result | undefined,
  word: string,
  vocabularyBookId: number,
  pronunciation: string | undefined,
) {
  if (!word) return false

  const res = await postWithToken(`/api/vocabulary_words/create`, {
    vocabulary_word: {
      part_of_speech: wordResult?.partOfSpeech,
      pronunciation: pronunciation,
      definition: wordResult?.definition,
      examples: wordResult?.examples,
      vocabulary_book_id: vocabularyBookId,
      word: word,
    },
  })

  if (res.ok) {
    return true
  }

  if (res.status === 422) {
    const data = await res.json()
    alert(data.message)
  }

  return false
}
