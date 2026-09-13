import { useContext } from 'react'
import { PointsContext } from './points-context'

export function usePoints() {
  const context = useContext(PointsContext)

  if (!context) {
    throw new Error('usePoints deve ser usado dentro de PointsProvider')
  }

  return context
}
