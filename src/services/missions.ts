import type { Mission, NewMission } from '../types/mission'

const API_URL = (import.meta.env.VITE_API_URL || 'https://gaia-api-sprint-4.vercel.app/').replace(/\/$/, '')

export async function getMissions(): Promise<Mission[]> {
  const response = await fetch(`${API_URL}/missoes`)

  if (!response.ok) {
    throw new Error('Não foi possível carregar as missões.')
  }

  return response.json()
}

export async function createMission(mission: NewMission): Promise<Mission> {
  const response = await fetch(`${API_URL}/missoes`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(mission),
  })

  if (!response.ok) {
    throw new Error('Não foi possível cadastrar a missão.')
  }

  return response.json()
}
