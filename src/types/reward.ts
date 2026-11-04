export interface Reward {
  id: number
  nome: string
  descricao: string
  pontos: number
  ativo: 0 | 1
}

export type NewReward = Omit<Reward, 'id'>
