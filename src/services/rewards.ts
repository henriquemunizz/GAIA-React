import type { NewReward, Reward } from '../types/reward'
import { request } from './api'

export function getRewards(): Promise<Reward[]> {
  return request('/recompensas')
}

export function createReward(data: NewReward): Promise<Reward> {
  return request('/recompensas', { method: 'POST', body: JSON.stringify(data) })
}

export function updateReward(id: number, data: NewReward): Promise<void> {
  return request(`/recompensas/${id}`, { method: 'PUT', body: JSON.stringify(data) })
}

export function deleteReward(id: number): Promise<void> {
  return request(`/recompensas/${id}`, { method: 'DELETE' })
}
