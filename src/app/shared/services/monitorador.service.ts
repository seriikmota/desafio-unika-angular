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
  getFilter(path: string) {
    return this.http.get<Monitoradores>(`${this.baseUrl}/filtrar${path}`);
  }
  getPdf(path: string) {
    return this.http.get(`${this.baseUrl}/relatorioPdf${path}`)
  }
  getExcel(path: string) {
    return this.http.get(`${this.baseUrl}/relatorioExcel${path}`)
  }
  getModelImport() {
    return this.http.get(`${this.baseUrl}/importar/modelo`)
  }

}
