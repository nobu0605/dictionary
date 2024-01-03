'use client'
import { zodResolver } from '@hookform/resolvers/zod'
import { TextField, styled } from '@mui/material'
import { useForm } from 'react-hook-form'
import { Button } from '@/components/ui/Button'
import { Flex } from '@/components/ui/Flex'
import { signInSchema, SignInSchemaType } from '@/features/sign-in/schema'

type MyResponse = Response & {
  headers: {
    get(name: 'uid'): string | null
    get(name: 'access-token'): string | null
    get(name: 'client'): string | null
  }
}

export default function SignIn() {
  const {
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<SignInSchemaType>({
    resolver: zodResolver(signInSchema),
  })

  async function onSubmit(data: SignInSchemaType) {
    try {
      const response: MyResponse = await fetch('http://localhost:4000/api/auth/sign_in', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })

      if (response.ok) {
        localStorage.setItem('access-token', response.headers.get('access-token') || '')
        localStorage.setItem('client', response.headers.get('client') || '')
        localStorage.setItem('uid', response.headers.get('uid') || '')
        alert('You logged in successfully!')
      }
    } catch (error) {
      console.error('Error:', error)
    }
  }

  return (
    <Flex $content='center'>
      <form onSubmit={handleSubmit(onSubmit)}>
        <StyledFlex $direction='column' $content='center' $gap='20px'>
          <h1>Sign in</h1>
          <TextField
            name='name'
            label='Outlined'
            variant='outlined'
            onChange={(e) => setValue('name', e.target.value)}
          />
          <TextField
            name='email'
            label='Outlined'
            variant='outlined'
            onChange={(e) => setValue('email', e.target.value)}
          />
          <TextField
            name='password'
            type='password'
            label='Outlined'
            variant='outlined'
            onChange={(e) => setValue('password', e.target.value)}
          />
          <TextField
            name='confirmPassword'
            type='password'
            label='Outlined'
            variant='outlined'
            onChange={(e) => setValue('confirmPassword', e.target.value)}
          />
          <Button type='submit' variant='contained'>
            Sign in
          </Button>
        </StyledFlex>
      </form>
    </Flex>
  )
}

const StyledFlex = styled(Flex)`
  width: 800px;
  margin-top: 100px;
`
