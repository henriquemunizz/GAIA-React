export interface User {
  id: number
  nomeUsuario: string
  perfil: 'USUARIO' | 'ADMIN'
}

export interface Credentials {
  nomeUsuario: string
  senha: string
}

export interface UserUpdate {
  nomeUsuario: string
  senha?: string
}
