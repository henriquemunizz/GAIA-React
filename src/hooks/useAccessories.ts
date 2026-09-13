import { useEffect, useState } from 'react'
import { getAccessories } from '../services/accessories'
import type { Accessory } from '../types/accessory'

interface UseAccessoriesResult {
  accessories: Accessory[]
  loading: boolean
  error: string | null
  reload: () => void
}

export function useAccessories(): UseAccessoriesResult {
  const [accessories, setAccessories] = useState<Accessory[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [reloadCount, setReloadCount] = useState(0)

  useEffect(() => {
    getAccessories()
      .then((data) => setAccessories(data))
      .catch(() => setError('Não foi possível conectar à API de recompensas.'))
      .finally(() => setLoading(false))
  }, [reloadCount])

  function reload() {
    setLoading(true)
    setError(null)
    setReloadCount((current) => current + 1)
  }

  return { accessories, loading, error, reload }
}
