'use client'
import { TextField, styled } from '@mui/material'
import { useState, FormEvent, useEffect, useContext, MouseEvent } from 'react'
import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'
import { Flex } from '@/components/ui/Flex'
import { Menu } from '@/components/ui/Menu'
import { AuthContext } from '@/contexts/AuthContext'
import { listVocabularyBooks } from '@/features/vocabulary-books/useVocabularyBooks'
import { addWordToVocabularyBook } from '@/features/vocabulary-books/useVocabularyWords'
import { VocabularyBook } from '@/types/vocabularyBooks'
import { ExampleResponse, WordResponse, Result, Pronunciation } from '@/types/word'
import { getWithToken } from '@/utils/fetchFromAPI'

export default function Home() {
  const [searchInput, setSearchInput] = useState('')
  const [searchWord, setSearchWord] = useState('')
  const [pronunciation, setPronunciation] = useState<Pronunciation | undefined>(undefined)
  const [wordResults, setWordResults] = useState<WordResponse | undefined>(undefined)
  const [exampleResults, setExampleResults] = useState<ExampleResponse | undefined>(undefined)
  const [vocabularyBooks, setVocabularyBooks] = useState<VocabularyBook[] | undefined>([])
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const [targetWordResult, setTargetWordResult] = useState<Result | undefined>()
  const state = useContext(AuthContext)
  const userState = state?.authState.user
  const isLoading = state?.authState.isLoading

  useEffect(() => {
    async function getVocabularyBooks() {
      const vocabularyBooks = await listVocabularyBooks(userState?.id)
      setVocabularyBooks(vocabularyBooks)
    }

    if (!isLoading) {
      getVocabularyBooks()
    }
  }, [isLoading])

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()

    try {
      const res = await getWithToken(`/api/search_word?word=${searchInput}`)
      if (res.ok) {
        const data = await res.json()

        setSearchWord(data.word.word)
        setPronunciation(data.word.pronunciation)
        setWordResults(data.word)
        setExampleResults(data.examples)
        return
      }

      if (res.status === 404) {
        const data = await res.json()
        alert(data.message)
      }

      setWordResults(undefined)
      setExampleResults(undefined)
    } catch (error) {
      console.error('Error:', error)
    }
  }

  function handleAddWord(e: MouseEvent<HTMLButtonElement>, wordResult: Result) {
    setTargetWordResult(wordResult)
    setAnchorEl(e.currentTarget)
  }

  function addWord(vocabularyBookId: number) {
    addWordToVocabularyBook(targetWordResult, searchWord, vocabularyBookId, pronunciation?.all)
    setAnchorEl(null)
  }

  if (!vocabularyBooks) {
    return <></>
  }

  const vocabularyBooksMenuItems = vocabularyBooks.map((vocabularyBook: VocabularyBook) => {
    return {
      onClick: () => addWord(vocabularyBook.id),
      name: vocabularyBook.name,
    }
  })

  return (
    <Flex $content='center' $direction='column'>
      <form onSubmit={(e) => onSubmit(e)}>
        <StyledFormFlex $content='center' $gap='15px'>
          <TextField
            name='searchWord'
            label='Search Word'
            variant='outlined'
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
          />
          <Button type='submit' variant='contained'>
            Search
          </Button>
        </StyledFormFlex>
      </form>
      <Flex $content='center' $direction='column'>
        {wordResults && (
          <StyledWordsFlex $content='center' $direction='column' $gap='15px'>
            <h1>Searched word: {searchWord}</h1>
            <span>pronunciation: {pronunciation?.all}</span>
            <Card>
              <h2>Example sentences of {searchWord}</h2>
              <Flex $direction='column' $gap={'15px'}>
                {!exampleResults?.examples && <span>No results found</span>}
                {exampleResults?.examples?.map((example: string, i) => (
                  <span key={i}>{example}</span>
                ))}
              </Flex>
            </Card>
            {!wordResults.results && <span>No results found</span>}
            {wordResults.results?.map((word: Result, i) => (
              <Card key={i}>
                <Flex $content='space-between'>
                  <Flex $direction='column' $gap={'15px'}>
                    <span>meaning {i + 1}</span>
                    <span>
                      Part of speech
                      <br /> {word.partOfSpeech}
                    </span>
                    <span>
                      Definition
                      <br /> {word.definition}
                    </span>
                    {word.synonyms && (
                      <p>
                        Synonyms
                        <br />
                        {word.synonyms.map((synonym, i) => (
                          <span key={i}>
                            {synonym}
                            {word.synonyms.length - 1 !== i && ', '}
                          </span>
                        ))}
                      </p>
                    )}
                    {word.examples && (
                      <p>
                        Examples
                        <br />
                        {word.examples.map((example, i) => (
                          <span key={i}>
                            {example}
                            {word.examples && word.examples.length - 1 !== i && ', '}
                          </span>
                        ))}
                      </p>
                    )}
                  </Flex>
                  <Flex $items='center'>
                    <Button
                      onClick={(e: MouseEvent<HTMLButtonElement>) => handleAddWord(e, word)}
                      size='small'
                      type='submit'
                      color='inherit'
                      variant='contained'
                    >
                      Add word
                    </Button>
                  </Flex>
                </Flex>
              </Card>
            ))}
            <Menu
              menuItems={vocabularyBooksMenuItems}
              anchorEl={anchorEl}
              setAnchorEl={setAnchorEl}
            />
          </StyledWordsFlex>
        )}
      </Flex>
    </Flex>
  )
}

const StyledFormFlex = styled(Flex)`
  margin-top: 100px;
`

const StyledWordsFlex = styled(Flex)`
  margin: 100px auto auto auto;
  width: 80%;
`
