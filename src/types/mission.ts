export interface Mission {
  id: number
  nome: string
  descricao: string
  dificuldade: 1 | 2 | 3
  pontos: number
  ativo: 0 | 1
}

export type NewMission = Omit<Mission, 'id'>
