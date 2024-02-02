import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {EnderecoRoutingModule} from './endereco-routing.module';
import {HttpClientModule} from "@angular/common/http";
import {ListagemEnderecoComponent} from "./listagem-endereco/listagem-endereco.component";


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    EnderecoRoutingModule,
    ListagemEnderecoComponent,
    HttpClientModule
  ]
})
export class EnderecoModule {
}
