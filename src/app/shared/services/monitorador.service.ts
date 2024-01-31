import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Monitorador, Monitoradores} from "../models/monitorador";

@Injectable({
  providedIn: 'root'
})
export class MonitoradorService {
  private baseUrl = "http://localhost:8081/monitorador";

  constructor(private http: HttpClient) {

  }
  postRegister(m: Monitorador){
    return this.http.post<Monitorador>(this.baseUrl, m)
  }
  postImport(){}
  putEdit(id: number, m: Monitorador){
    return this.http.put<Monitorador>(`${this.baseUrl}/${id}`, m)
  }
  delete(id: number){
    return this.http.delete<Monitorador>(`${this.baseUrl}/${id}`)
  }
  getList() {
    return this.http.get<Monitoradores>(this.baseUrl);
  }
  getFilter(filtros: any) {
    let path = this.makePath(null, filtros)
    return this.http.get<Monitoradores>(`${this.baseUrl}/filtrar${path}`);
  }
  getPdf(id: any, filtros: any) {
    let path = this.makePath(id, filtros)
    window.open(`${this.baseUrl}/relatorioPdf${path}`);
  }
  getExcel(id: any, filtros: any) {
    let path = this.makePath(id, filtros)
    window.open(`${this.baseUrl}/relatorioExcel${path}`);
  }
  getModelImport() {
    window.open(`${this.baseUrl}/importar/modelo`);
  }

  makePath(id: any, filtros: any){
    let path;
    if (id != null)
      path = `?id=${id}`;
    else if (filtros == undefined)
      path = ''
    else {
      let text = filtros.texto;
      let tipo = filtros.tipo;
      let ativo = filtros.ativo;
      if (text == undefined)
        text = ''
      if (tipo == undefined)
        tipo = ''
      if (ativo == undefined)
        ativo = ''
      path = `?text=${text}&tipo=${tipo}&ativo=${ativo}`
    }
    return path
  }

}
