export type Result = {
  definition: string
  derivation: string[]
  partOfSpeech: string
  synonyms: string[]
  typeOf: string[]
}

export type WordResponse = {
  frequency: number
  pronunciation: { all: string }
  results: Result[]
  syllables: { count: number; list: number[] }
  word: string
}

export type ExampleResponse = {
  examples: string[]
  word: string
}
