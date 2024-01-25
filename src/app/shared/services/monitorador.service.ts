import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class MonitoradorService {
  private baseUrl = "http://localhost:8081/monitorador";

  constructor(private http: HttpClient) {

  }
  getCidade() {
    return this.http.get(this.baseUrl);
  }
}
