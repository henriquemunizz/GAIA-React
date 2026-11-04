import type { HistoryEntry, Progress } from '../types/progress'
import { request } from './api'

export function getProgress(): Promise<Progress> {
  return request('/usuarios/me/progresso')
}

export function completeMission(id: number): Promise<Progress> {
  return request(`/usuarios/me/missoes/${id}/concluir`, { method: 'POST' })
}

export function redeemReward(id: number): Promise<Progress> {
  return request(`/usuarios/me/recompensas/${id}/resgatar`, { method: 'POST' })
}

export function getMissionHistory(): Promise<HistoryEntry[]> {
  return request('/usuarios/me/missoes')
}

export function getRewardHistory(): Promise<HistoryEntry[]> {
  return request('/usuarios/me/recompensas')
}
