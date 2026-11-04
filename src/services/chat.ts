import { request } from './api'
import type { ChatMessage, Conversation } from '../types/chat'

const path = '/usuarios/me/conversas'

export function getConversations(): Promise<Conversation[]> {
  return request(path)
}

export function createConversation(): Promise<Conversation> {
  return request(path, { method: 'POST' })
}

export function getMessages(id: number): Promise<ChatMessage[]> {
  return request(`${path}/${id}/mensagens`)
}

export function sendMessage(id: number, texto: string, requisicaoId: string): Promise<ChatMessage[]> {
  return request(`${path}/${id}/mensagens`, { method: 'POST', body: JSON.stringify({ texto, requisicaoId }) })
}
