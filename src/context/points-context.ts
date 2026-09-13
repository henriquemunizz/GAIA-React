import { createContext } from 'react'

export interface PointsContextValue {
  points: number
  addPoints: (value: number) => void
  spendPoints: (value: number) => boolean
}

export const PointsContext = createContext<PointsContextValue | null>(null)
