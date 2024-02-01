import {Monitorador} from "./monitorador";
export interface Endereco {
  id: number
  cep: string
  endereco: string
  numero: string
  bairro: string
  cidade: string
  estado: string
  telefone: string
  principal: boolean
  monitorador: Monitorador
}

export interface Enderecos extends Array<Endereco>{}
