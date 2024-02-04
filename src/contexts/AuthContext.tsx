'use client'
import { usePathname } from 'next/navigation'
import React, { createContext, FC, useEffect, useReducer, Dispatch } from 'react'
import { authReducer, Action } from '@/reducers/AuthReducer'
import { User } from '@/types/user'
import { postWithToken } from '@/utils/fetchFromAPI'

export type State = {
  user?: User
  isLoading: boolean
}

export const initialState = {
  user: undefined,
  isLoading: true,
}

const AuthContext = createContext<
  | {
      authState: State
      dispatch: Dispatch<Action>
    }
  | undefined
>(undefined)

const urlsWithoutAuth = ['/sign-in', '/sign-up']

type Props = {
  children: React.ReactNode
}

const AuthProvider: FC<Props> = ({ children }) => {
  const pathname = usePathname()
  const [authState, dispatch] = useReducer(authReducer, initialState)

  useEffect(() => {
    checkAuth()
  }, [pathname])

  async function checkAuth() {
    if (urlsWithoutAuth.includes(pathname)) {
      return
    }

    const uid = localStorage.getItem('uid')
    if (!uid) {
      return (location.pathname = '/sign-in')
    }

    const res = await postWithToken(`/api/get_user`, {
      uid,
    })

    if (!res.ok) {
      return (location.pathname = '/sign-in')
    }

    const data: User = await res.json()
    authState['user'] = data
    dispatch({ type: 'FETCH_SUCCESS' })
  }

  return <AuthContext.Provider value={{ authState, dispatch }}>{children}</AuthContext.Provider>
}

export { AuthContext, AuthProvider }
