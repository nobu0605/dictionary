export type Result = {
  definition: string
  derivation: string[]
  partOfSpeech: string
  synonyms: string[]
  typeOf: string[]
  examples?: string[]
}

export type Pronunciation = { all: string }

export type WordResponse = {
  frequency: number
  pronunciation: Pronunciation
  results: Result[]
  syllables: { count: number; list: number[] }
  word: string
}

export type ExampleResponse = {
  examples: string[]
  word: string
}
