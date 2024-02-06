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

  postRegister(m: Monitorador) {
    m.data = this.formatDate(m.data)
    return this.http.post<any>(this.baseUrl, m)
  }

  postImport(file: any) {
    const formData = new FormData();
    formData.append('file', file)
    return this.http.post<any>(`${this.baseUrl}/importar`, formData)
  }

  putEdit(id: number, m: Monitorador) {
    m.data = this.formatDate(m.data)
    return this.http.put<Monitorador>(`${this.baseUrl}/${id}`, m)
  }

  delete(id: number) {
    return this.http.delete<Monitorador>(`${this.baseUrl}/${id}`)
  }

  getList(filtros: any) {
    if (filtros == ''){
      return this.http.get<Monitoradores>(this.baseUrl);
    }
    else {
      let path = this.makePath('', filtros)
      return this.http.get<Monitoradores>(`${this.baseUrl}/filtrar${path}`);
    }
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

  makePath(id: any, filtros: any) {
    let path;
    if (id != '')
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

  formatDate(date: string){
    date = date.replace(/[^0-9]/g, '')
    return date
      .padStart(8, '0')
      .substring(0,8)
      .replace(
        /(\d{2})(\d{2})(\d{4})/,
        '$1/$2/$3'
      )
  }


}
