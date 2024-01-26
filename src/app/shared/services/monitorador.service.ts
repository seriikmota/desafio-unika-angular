import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Monitorador, MonitoradorList} from "../models/monitorador";

@Injectable({
  providedIn: 'root'
})
export class MonitoradorService {
  private baseUrl = "http://localhost:8081/monitorador";

  constructor(private http: HttpClient) {

  }
  getMonitoradores() {
    return this.http.get<Monitorador[]>(this.baseUrl);
  }
}
