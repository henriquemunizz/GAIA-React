import { useState, type ReactNode } from 'react'
import { PointsContext } from './points-context'

interface PointsProviderProps {
  children: ReactNode
}

export function PointsProvider({ children }: PointsProviderProps) {
  const [points, setPoints] = useState(0)

  function addPoints(value: number) {
    setPoints((currentPoints) => currentPoints + value)
  }

  function spendPoints(value: number) {
    if (points < value) return false

    setPoints((currentPoints) => currentPoints - value)
    return true
  }

  return (
    <PointsContext.Provider value={{ points, addPoints, spendPoints }}>
      {children}
    </PointsContext.Provider>
  )
}
