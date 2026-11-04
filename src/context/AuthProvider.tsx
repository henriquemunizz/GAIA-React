import { useCallback, useEffect, useRef, useState, type ReactNode } from 'react'
import { ApiError, errorMessage } from '../services/api'
import { getCurrentUser } from '../services/users'
import type { User } from '../types/user'
import { AuthContext } from './auth-context'

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, updateUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const version = useRef(0)

  const setUser = useCallback((value: User | null) => {
    version.current += 1
    updateUser(value)
    setError('')
    setLoading(false)
  }, [])

  const refreshSession = useCallback(() => {
    const current = ++version.current
    return getCurrentUser().then((value) => {
      if (current === version.current) {
        updateUser(value)
        setError('')
      }
    }).catch((error) => {
      if (current === version.current) {
        updateUser(null)
        setError(error instanceof ApiError && error.status === 401 ? '' : errorMessage(error))
      }
    }).finally(() => {
      if (current === version.current) setLoading(false)
    })
  }, [])

  useEffect(() => {
    function expireSession() {
      setUser(null)
    }

    void refreshSession()
    window.addEventListener('gaia:session-expired', expireSession)
    window.addEventListener('gaia:permission-changed', refreshSession)

    return () => {
      version.current += 1
      window.removeEventListener('gaia:session-expired', expireSession)
      window.removeEventListener('gaia:permission-changed', refreshSession)
    }
  }, [refreshSession, setUser])

  return (
    <AuthContext.Provider value={{ user, loading, error, setUser, refreshSession }}>
      {children}
    </AuthContext.Provider>
  )
}
