import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Endereco} from "../models/endereco";

@Injectable({
  providedIn: 'root'
})
export class EnderecoService {
  private baseUrl = "http://localhost:8081/endereco";

  constructor(private http: HttpClient) {

  }

  postRegister(e: Endereco, idM: number){
    return this.http.post<Endereco>(this.baseUrl + '?idM=' + idM, e)
  }
  putEdit(e: Endereco, idE: number, idM: number){
    return this.http.put<Endereco>(this.baseUrl + '/' + idE + '?idM=' + idM, e)
  }
  delete(id: number){
    return this.http.delete<Endereco>(this.baseUrl + '/' + id)
  }
  getList() {
    return this.http.get<Endereco[]>(this.baseUrl);
  }
  getFilter(path: string) {
    return this.http.get<Endereco[]>(this.baseUrl + '/filtrar' + path);
  }
  getPdf(path: string) {
    return this.http.get(this.baseUrl + '/relatorioPdf' + path)
  }
  getExcel(path: string) {
    return this.http.get(this.baseUrl + '/relatorioExcel' + path)
  }
  getCep(cep: string) {
    return this.http.get<Endereco>(this.baseUrl + '/cep/' + cep);
  }

}
