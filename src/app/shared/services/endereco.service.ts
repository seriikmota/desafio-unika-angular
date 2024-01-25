import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class EnderecoService {

  private baseUrl = "https://viacep.com.br/ws/75095030/json/";
  constructor(private http: HttpClient) {

  }

  public getCidade(){
    return this.http.get(this.baseUrl)
  }

}
