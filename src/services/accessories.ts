import type { Accessory, NewAccessory } from '../types/accessory'

const API_URL = (import.meta.env.VITE_API_URL || 'https://gaia-api-sprint-4.vercel.app/').replace(/\/$/, '')

export async function getAccessories(): Promise<Accessory[]> {
  const response = await fetch(`${API_URL}/recompensas`)

  if (!response.ok) {
    throw new Error('Não foi possível carregar as recompensas.')
  }

  return response.json()
}

export async function getAccessoryById(id: number): Promise<Accessory> {
  const response = await fetch(`${API_URL}/recompensas/${id}`)

  if (!response.ok) {
    throw new Error('Recompensa não encontrada.')
  }

  return response.json()
}

export async function createAccessory(accessory: NewAccessory): Promise<Accessory> {
  const response = await fetch(`${API_URL}/recompensas`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(accessory),
  })

  if (!response.ok) {
    throw new Error('Não foi possível cadastrar a recompensa.')
  }

  return response.json()
}
