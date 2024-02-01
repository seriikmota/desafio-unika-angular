import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EnderecoRoutingModule } from './endereco-routing.module';
import {ListagemComponent} from "./listagem/listagem.component";
import {HttpClientModule} from "@angular/common/http";


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    EnderecoRoutingModule,
    ListagemComponent,
    HttpClientModule
  ]
})
export class EnderecoModule { }
