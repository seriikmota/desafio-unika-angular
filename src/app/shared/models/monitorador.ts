import {Endereco} from "./endereco"
enum TipoPessoa {
  Fisica = "FISICAA",
  Juridica = "JURIDICAA"
}

export interface Monitorador {
  id: number
  tipo: TipoPessoa
  cnpj: string
  razao: string
  inscricao: string
  cpf: string
  nome: string
  rg: string
  email: string
  data: string
  ativo: boolean
}

export interface MonitoradorList extends Array<Monitorador>{}
