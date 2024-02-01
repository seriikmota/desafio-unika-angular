import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MonitoradorRoutingModule } from './monitorador-routing.module';
import {ListagemComponent} from "./listagem/listagem.component";
import {HttpClientModule} from "@angular/common/http";


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MonitoradorRoutingModule,
    ListagemComponent,
    HttpClientModule
  ]
})
export class MonitoradorModule {}
