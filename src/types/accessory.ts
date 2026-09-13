export interface Accessory {
  idRecompensa: number
  nmRecompensa: string
  dsRecompensa: string
  tpAcessorio: string
  nrCustoPontos: number
  dsImagem: string | null
  stRecompensa: string
}

export type NewAccessory = Omit<Accessory, 'idRecompensa'>
