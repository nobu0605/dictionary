'use client'
import { zodResolver } from '@hookform/resolvers/zod'
import { TextField, styled, Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material'
import React, { useContext, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { Button } from '@/components/ui/Button'
import { Flex } from '@/components/ui/Flex'
import { AuthContext } from '@/contexts/AuthContext'
import {
  vocabularyBooksSchema,
  VocabularyBooksSchemaType,
} from '@/features/vocabulary-books/schema'
import { VocabularyBook } from '@/types/vocabularyBooks'
import { formatDate } from '@/utils/date'
import { postWithToken, getWithToken, deleteWithToken } from '@/utils/fetchFromAPI'

export default function VocabularyBooks() {
  const state = useContext(AuthContext)
  const userState = state?.authState.user
  const isLoading = state?.authState.isLoading
  const [vocabularyBooks, setVocabularyBooks] = useState<VocabularyBook[]>([])

  async function listVocabularyBooks() {
    const res = await getWithToken(`/api/vocabulary_books/list?user_id=${userState?.id}}`)
    if (res.ok) {
      const data = await res.json()
      setVocabularyBooks(data.vocabulary_books)
      return
    }
  }

  async function deleteVocabularyBook(id: number) {
    if (!confirm('Are you sure to delete this vocabulary book?')) return

    const res = await deleteWithToken(`/api/vocabulary_books/delete/${id}`)

    if (res.ok) {
      await listVocabularyBooks()
      return
    }
  }

  useEffect(() => {
    if (!isLoading) {
      listVocabularyBooks()
    }
  }, [isLoading])

  const {
    handleSubmit,
    setValue,
    formState: { errors },
    reset,
    watch,
  } = useForm<VocabularyBooksSchemaType>({
    resolver: zodResolver(vocabularyBooksSchema),
    defaultValues: {
      name: '',
      description: '',
    },
  })

  async function onSubmit(data: VocabularyBooksSchemaType) {
    try {
      const res = await postWithToken(`/api/vocabulary_books/create`, {
        vocabulary_book: {
          name: data.name,
          description: data.description,
          user_id: userState?.id,
        },
      })

      if (res.ok) {
        await listVocabularyBooks()
        reset()
        return
      }
    } catch (error) {
      console.error('Error:', error)
    }
  }

  return (
    <>
      <Flex $content='center'>
        <form onSubmit={handleSubmit(onSubmit)}>
          <StyledFormFlex $content='center' $direction='column' $gap='15px'>
            <TextField
              name='name'
              label='Vocabulary book name'
              variant='outlined'
              value={watch('name')}
              onChange={(e) => setValue('name', e.target.value)}
              error={!!errors.name}
              helperText={errors.name?.message}
            />
            <TextField
              name='description'
              label='Description'
              variant='outlined'
              value={watch('description')}
              onChange={(e) => setValue('description', e.target.value)}
              error={!!errors.description}
              helperText={errors.description?.message}
            />
            <Button type='submit' variant='contained'>
              create
            </Button>
          </StyledFormFlex>
        </form>
      </Flex>
      <Flex $content='center'>
        <StyledVocabularyBooksFlex $direction='column' $gap={'20px'}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell align='center'>id</TableCell>
                <TableCell align='center'>Name</TableCell>
                <TableCell align='center'>Description</TableCell>
                <TableCell align='center'>Created date</TableCell>
                <TableCell align='center'>Detail</TableCell>
                <TableCell align='center'>Delete</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {vocabularyBooks.map((vocabularyBook: VocabularyBook, i) => (
                <TableRow key={i}>
                  <TableCell align='center' component='th' scope='row'>
                    <span>{vocabularyBook.id}</span>
                  </TableCell>
                  <TableCell align='center'>
                    <span>{vocabularyBook.name}</span>
                  </TableCell>
                  <TableCell align='center'>
                    <span>{vocabularyBook.description}</span>
                  </TableCell>
                  <TableCell align='center'>
                    <span>{formatDate(vocabularyBook.created_at)}</span>
                  </TableCell>
                  <TableCell align='center'>
                    <Button
                      href={`/vocabulary-books/${vocabularyBook.id}`}
                      size='small'
                      variant='contained'
                      color='inherit'
                    >
                      detail
                    </Button>
                  </TableCell>
                  <TableCell align='right'>
                    <StyledVocabularyBooksDeleteWrapper>
                      <Button
                        size='small'
                        variant='contained'
                        color='inherit'
                        onClick={() => deleteVocabularyBook(vocabularyBook.id)}
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

const StyledFormFlex = styled(Flex)`
  margin-top: 100px;
  width: 800px;
`

const StyledVocabularyBooksFlex = styled(Flex)`
  margin-top: 100px;
  margin-bottom: 100px;
  width: 800px;
`
const StyledVocabularyBooksDeleteWrapper = styled('div')`
  width: 100px;
`
