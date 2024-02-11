'use client'
import { styled, Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material'
import { useParams } from 'next/navigation'
import React, { useContext, useEffect, useState } from 'react'
import { Button } from '@/components/ui/Button'
import { Flex } from '@/components/ui/Flex'
import { AuthContext } from '@/contexts/AuthContext'
import { VocabularyWord } from '@/types/vocabularyWords'
import { formatDate } from '@/utils/date'
import { getWithToken, deleteWithToken } from '@/utils/fetchFromAPI'

export default function VocabularyBook() {
  const params = useParams()
  const { vocabularyBookId } = params
  const state = useContext(AuthContext)
  const isLoading = state?.authState.isLoading
  const [vocabularyWords, setVocabularyWords] = useState<VocabularyWord[]>([])

  async function listVocabularyWords() {
    const res = await getWithToken(`/api/vocabulary_words/${vocabularyBookId}`)
    if (res.ok) {
      const data = await res.json()
      setVocabularyWords(data.vocabulary_words)
      return
    }
  }

  async function deleteVocabularyWord(id: number, word: string) {
    if (!confirm(`Are you sure to delete ${word}?`)) return

    const res = await deleteWithToken(`/api/vocabulary_words/delete/${id}`)

    if (res.ok) {
      await listVocabularyWords()
      return
    }
  }

  useEffect(() => {
    if (!isLoading) {
      listVocabularyWords()
    }
  }, [isLoading])

  return (
    <>
      <Flex $content='center'>
        <StyledVocabularyBooksFlex $direction='column' $gap={'20px'}>
          <h1>{vocabularyWords[0]?.vocabulary_book_name}</h1>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell align='center'>id</TableCell>
                <TableCell align='center'>Word</TableCell>
                <TableCell align='center'>Definition</TableCell>
                <TableCell align='center'>Pronunciation</TableCell>
                <TableCell align='center'>Examples</TableCell>
                <TableCell align='center'>Created date</TableCell>
                <TableCell align='center'>Delete</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {vocabularyWords.map((vocabularyWord: VocabularyWord, i) => (
                <TableRow key={i}>
                  <TableCell align='center' component='th' scope='row'>
                    <span>{vocabularyWord.id}</span>
                  </TableCell>
                  <TableCell align='center'>
                    <span>{vocabularyWord.word}</span>
                  </TableCell>
                  <TableCell align='center'>
                    <span>{vocabularyWord.definition}</span>
                  </TableCell>
                  <TableCell align='center'>
                    <span>{vocabularyWord.pronunciation}</span>
                  </TableCell>
                  <TableCell align='center'>
                    <span>{vocabularyWord.examples}</span>
                  </TableCell>
                  <TableCell align='center'>
                    <span>{formatDate(vocabularyWord.created_at)}</span>
                  </TableCell>
                  <TableCell align='right'>
                    <StyledVocabularyBooksDeleteWrapper>
                      <Button
                        onClick={() => deleteVocabularyWord(vocabularyWord.id, vocabularyWord.word)}
                        size='small'
                        variant='contained'
                        color='inherit'
                      >
                        delete
                      </Button>
                    </StyledVocabularyBooksDeleteWrapper>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </StyledVocabularyBooksFlex>
      </Flex>
    </>
  )
}

const StyledVocabularyBooksFlex = styled(Flex)`
  margin-top: 100px;
  margin-bottom: 100px;
  width: 800px;
`
const StyledVocabularyBooksDeleteWrapper = styled('div')`
  width: 100px;
`
