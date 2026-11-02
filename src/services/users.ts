import type { Credentials, User, UserUpdate } from '../types/user'
import { request } from './api'

export function registerUser(data: Credentials): Promise<User> {
  return request('/usuarios', { method: 'POST', body: JSON.stringify(data) })
}

export function login(data: Credentials): Promise<User> {
  return request('/usuarios/login', { method: 'POST', body: JSON.stringify(data) })
}

export function logout(): Promise<void> {
  return request('/usuarios/logout', { method: 'POST' })
}

export function getCurrentUser(): Promise<User> {
  return request('/usuarios/me')
}

export function updateCurrentUser(data: UserUpdate): Promise<User> {
  return request('/usuarios/me', { method: 'PUT', body: JSON.stringify(data) })
}

export function deleteCurrentUser(): Promise<void> {
  return request('/usuarios/me', { method: 'DELETE' })
}
