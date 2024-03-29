'use client'
import { zodResolver } from '@hookform/resolvers/zod'
import { TextField, styled } from '@mui/material'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { Button } from '@/components/ui/Button'
import { Flex } from '@/components/ui/Flex'
import { signInSchema, SignInSchemaType } from '@/features/sign-in/schema'
import { postWithToken } from '@/utils/fetchFromAPI'

type SignInResponse = Response & {
  headers: {
    get(name: 'uid'): string | null
    get(name: 'access-token'): string | null
    get(name: 'client'): string | null
  }
}

export default function SignIn() {
  const router = useRouter()
  const {
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<SignInSchemaType>({
    resolver: zodResolver(signInSchema),
  })

  async function onSubmit(data: SignInSchemaType) {
    try {
      const response: SignInResponse = await postWithToken('/api/auth/sign_in', data)

      if (response.ok) {
        localStorage.setItem('access-token', response.headers.get('access-token') || '')
        localStorage.setItem('client', response.headers.get('client') || '')
        localStorage.setItem('uid', response.headers.get('uid') || '')
        alert('You logged in successfully!')
        router.push('/')
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
            name='email'
            label='Email'
            variant='outlined'
            onChange={(e) => setValue('email', e.target.value)}
            error={!!errors.email}
            helperText={errors.email?.message}
          />
          <TextField
            name='password'
            type='password'
            label='Password'
            variant='outlined'
            onChange={(e) => setValue('password', e.target.value)}
            error={!!errors.password}
            helperText={errors.password?.message}
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
