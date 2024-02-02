import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Endereco, Enderecos} from "../models/endereco";

@Injectable({
  providedIn: 'root'
})
export class EnderecoService {
  private baseUrl = "http://localhost:8081/endereco";

  constructor(private http: HttpClient) {}

  postRegister(e: Endereco, idM: number){
    return this.http.post<Endereco>(this.baseUrl + '?idM=' + idM, e)
  }
  putEdit(e: Endereco, idE: number, idM: number){
    return this.http.put<Endereco>(this.baseUrl + '/' + idE + '?idM=' + idM, e)
  }
  delete(id: number){
    return this.http.delete<Endereco>(this.baseUrl + '/' + id)
  }
  getList(filtros: string) {
    if (filtros == '' || filtros == null)
      return this.http.get<Enderecos>(this.baseUrl);
    else{
      let path = this.makePath(null, filtros)
      return this.http.get<Enderecos>(`${this.baseUrl}/filtrar${path}`);
    }
  }
  getFilter(filtros: any) {
    let path = this.makePath(null, filtros)
    console.log(path)
    return this.http.get<Enderecos>(`${this.baseUrl}/filtrar${path}`);
  }
  getPdf(id: any, filtros: any) {
    let path = this.makePath(id, filtros)
    window.open(`${this.baseUrl}/relatorioPdf${path}`);
  }
  getExcel(id: any, filtros: any) {
    let path = this.makePath(id, filtros)
    window.open(`${this.baseUrl}/relatorioExcel${path}`);
  }
  getCep(cep: string) {
    return this.http.get<Endereco>(this.baseUrl + '/cep/' + cep);
  }

  makePath(id: any, filtros: any){
    let path;
    if (id != null)
      path = `?id=${id}`;
    else if (filtros == undefined)
      path = ''
    else {
      let text = filtros.texto;
      let estado = filtros.estado;
      let cidade = filtros.cidade;
      let monitorador = filtros.monitorador;
      if (text == undefined)
        text = ''
      if (estado == undefined)
        estado = ''
      if (cidade == undefined)
        cidade = ''
      if (monitorador == undefined)
        monitorador = ''
      path = `?text=${text}&estado=${estado}&cidade=${cidade}&monitorador=${monitorador}`
    }
    return path
  }
}
