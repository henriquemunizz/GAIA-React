export interface Progress {
  pontosTotais: number
  saldo: number
  missoesConcluidas: number
}

export interface HistoryEntry {
  id: number
  itemId: number
  pontos: number
  data: string
}
