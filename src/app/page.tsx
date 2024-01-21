'use client'
import { TextField, styled } from '@mui/material'
import { useState, FormEvent } from 'react'
import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'
import { Flex } from '@/components/ui/Flex'
import { ExampleResponse, WordResponse, Result } from '@/types/word'
import { fetchFromAPI } from '@/utils/fetch'

export default function Home() {
  const [searchWord, setSearchWord] = useState('')
  const [wordResults, setWordResults] = useState<WordResponse | undefined>(undefined)
  const [exampleResults, setExampleResults] = useState<ExampleResponse | undefined>(undefined)

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()

    try {
      const res = await fetchFromAPI(`/api/search_word?word=${searchWord}`, 'GET')
      if (res.ok) {
        const data = await res.json()

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

  return (
    <Flex $content='center' $direction='column'>
      <form onSubmit={(e) => onSubmit(e)}>
        <StyledFormFlex $content='center' $gap='15px'>
          <TextField
            name='searchWord'
            label='Search Word'
            variant='outlined'
            value={searchWord}
            onChange={(e) => setSearchWord(e.target.value)}
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
                </Flex>
              </Card>
            ))}
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
