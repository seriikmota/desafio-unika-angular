import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {EnderecoRoutingModule} from './endereco-routing.module';
import {HttpClientModule} from "@angular/common/http";


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    EnderecoRoutingModule,
    HttpClientModule
  ]
})
export class EnderecoModule {
}
