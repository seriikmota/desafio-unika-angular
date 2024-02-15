import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Endereco, Enderecos} from "../models/endereco";

@Injectable({
  providedIn: 'root'
})
export class EnderecoService {
  private baseUrl = "http://localhost:8081/endereco";

  constructor(private http: HttpClient) {}

  postRegister(monitoradorId: number, e: Endereco){
    return this.http.post<Endereco>(`${this.baseUrl}?monitoradorId=${monitoradorId}`, e)
  }
  putEdit(monitoradorId: number, enderecoId: number, e: Endereco, ){
    return this.http.put<Endereco>(`${this.baseUrl}/${enderecoId}?monitoradorId=${monitoradorId}`, e)
  }
  delete(id: number){
    return this.http.delete<Endereco>(this.baseUrl + '/' + id)
  }
  getList(filtros: string) {
    if (filtros == '')
      return this.http.get<Enderecos>(this.baseUrl);
    else{
      let path = this.makePath('', filtros)
      return this.http.get<Enderecos>(`${this.baseUrl}/filtrar${path}`);
    }
  }
  getPdf(id: any, filtros: any) {
    console.log(filtros)
    let path = this.makePath(id, filtros)
    window.open(`${this.baseUrl}/pdf${path}`);
  }
  getExcel(id: any, filtros: any) {
    let path = this.makePath(id, filtros)
    window.open(`${this.baseUrl}/excel${path}`);
  }
  getCep(cep: string) {
    return this.http.get<Endereco>(this.baseUrl + '/cep/' + cep);
  }

  makePath(id: any, filtros: any){
    let path;
    if (id != '')
      path = `?id=${id}&monitoradorId=${filtros.monitoradorId}`;
    else if (filtros == undefined)
      path = ''
    else {
      let text = filtros.texto;
      let estado = filtros.estado;
      let cidade = filtros.cidade;
      let monitoradorId = filtros.monitoradorId;
      if (text == undefined)
        text = ''
      if (estado == undefined)
        estado = ''
      if (cidade == undefined)
        cidade = ''
      if (monitoradorId == undefined)
        monitoradorId = ''
      path = `?text=${text}&estado=${estado}&cidade=${cidade}&monitoradorId=${monitoradorId}`
    }
    return path
  }
}
