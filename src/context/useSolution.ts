import { useOutletContext } from 'react-router-dom'
import type { Progress } from '../types/progress'

export interface SolutionContext {
  progress: Progress | null
  setProgress: (progress: Progress) => void
  refreshProgress: () => Promise<void>
}

export function useSolution() {
  return useOutletContext<SolutionContext>()
}
