import type { Mission, NewMission } from '../types/mission'
import { request } from './api'

export function getMissions(): Promise<Mission[]> {
  return request('/missoes')
}

export function createMission(data: NewMission): Promise<Mission> {
  return request('/missoes', { method: 'POST', body: JSON.stringify(data) })
}

export function updateMission(id: number, data: NewMission): Promise<void> {
  return request(`/missoes/${id}`, { method: 'PUT', body: JSON.stringify(data) })
}

export function deleteMission(id: number): Promise<void> {
  return request(`/missoes/${id}`, { method: 'DELETE' })
}
