export interface Conversation {
  id: number
  titulo: string
  data: string
}

export interface ChatMessage {
  id: number
  autor: 'usuario' | 'gaia'
  texto: string
  data: string
  requisicaoId: string
}
