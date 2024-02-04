'use client'
import { zodResolver } from '@hookform/resolvers/zod'
import { TextField, styled } from '@mui/material'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { Button } from '@/components/ui/Button'
import { Flex } from '@/components/ui/Flex'
import { signUpSchema, SignUpSchemaType } from '@/features/sign-up/schema'
import { postWithToken } from '@/utils/fetchFromAPI'

export default function SignUp() {
  const router = useRouter()
  const {
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<SignUpSchemaType>({
    resolver: zodResolver(signUpSchema),
  })

  async function onSubmit(data: SignUpSchemaType) {
    try {
      const res = await postWithToken('/api/auth', {
        ...data,
        confirm_success_url: `${process.env.NEXT_PUBLIC_CLIENT_URL}/sign-in`,
      })
      if (res.ok) {
        alert('You signed up successfully!')
        router.push('/sign-in')
      }
    } catch (error) {
      console.error('Error:', error)
    }
  }

  return (
    <Flex $content='center'>
      <form onSubmit={handleSubmit(onSubmit)}>
        <StyledFlex $direction='column' $content='center' $gap='20px'>
          <h1>Sign up</h1>
          <TextField
            name='name'
            label='Name'
            variant='outlined'
            onChange={(e) => setValue('name', e.target.value)}
            error={!!errors.name}
            helperText={errors.name?.message}
          />
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
          <TextField
            name='password_confirmation'
            type='password'
            label='Password'
            variant='outlined'
            onChange={(e) => setValue('password_confirmation', e.target.value)}
            error={!!errors.password_confirmation}
            helperText={errors.password_confirmation?.message}
          />
          <Button type='submit' variant='contained'>
            Sign up
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
