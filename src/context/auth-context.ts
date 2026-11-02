import { createContext } from 'react'
import type { User } from '../types/user'

export interface AuthContextValue {
  user: User | null
  loading: boolean
  error: string
  setUser: (user: User | null) => void
  refreshSession: () => Promise<void>
}

export const AuthContext = createContext<AuthContextValue | null>(null)
