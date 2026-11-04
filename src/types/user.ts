export interface User {
  id: number
  nomeUsuario: string
  perfil: 0 | 1
}

export interface Credentials {
  nomeUsuario: string
  senha: string
}

export interface Registration extends Credentials {
  perfil: 0 | 1
}

export interface UserUpdate {
  nomeUsuario: string
  senha?: string
}
