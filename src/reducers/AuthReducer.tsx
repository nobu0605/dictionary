import { initialState, State } from '@/contexts/AuthContext'
import { User } from '@/types/user'

export type Action =
  | {
      type: 'LOGOUT'
    }
  | {
      type: 'FETCH_SUCCESS'
    }
  | {
      type: 'UPDATE_USER'
      payload: { user: undefined | User }
    }

export const authReducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'LOGOUT':
      return initialState
    case 'FETCH_SUCCESS':
      return {
        ...state,
        isLoading: false,
      }
    case 'UPDATE_USER': {
      const { user } = action.payload

      return {
        ...state,
        user: user,
      }
    }
    default:
      return state
  }
}
