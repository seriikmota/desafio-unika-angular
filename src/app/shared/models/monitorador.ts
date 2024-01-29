// @ts-ignore

import {Endereco} from "./endereco"
export interface Monitorador {
  id: number
  tipo: string
  cnpj: string
  razao: string
  inscricao: string
  cpf: string
  nome: string
  rg: string
  email: string
  data: string
  ativo: boolean
  enderecos?: Endereco[]
}
export interface Monitoradores extends Array<Monitorador>{}

