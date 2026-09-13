import { useEffect, useState } from 'react'
import { getMissions } from '../services/missions'
import type { Mission } from '../types/mission'

interface UseMissionsResult {
  missions: Mission[]
  loading: boolean
  error: string | null
  reload: () => void
}

export function useMissions(): UseMissionsResult {
  const [missions, setMissions] = useState<Mission[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [reloadCount, setReloadCount] = useState(0)

  useEffect(() => {
    getMissions()
      .then((data) => setMissions(data))
      .catch(() => setError('Não foi possível conectar à API de missões.'))
      .finally(() => setLoading(false))
  }, [reloadCount])

  function reload() {
    setLoading(true)
    setError(null)
    setReloadCount((current) => current + 1)
  }

  return { missions, loading, error, reload }
}
