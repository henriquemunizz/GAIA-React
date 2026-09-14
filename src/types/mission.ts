export interface Mission {
  idMissao: number
  nmMissao: string
  dsMissao: string
  tpDificuldade: number
  nrPontosRecompensa: number
  dsImagem: string | null
  stMissao: string
}

export type NewMission = Omit<Mission, 'idMissao'>
