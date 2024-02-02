import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {MonitoradorRoutingModule} from './monitorador-routing.module';
import {HttpClientModule} from "@angular/common/http";
import {ListagemMonitoradorComponent} from "./listagem-monitorador/listagem-monitorador.component";

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MonitoradorRoutingModule,
    ListagemMonitoradorComponent,
    HttpClientModule
  ]
})
export class MonitoradorModule {
}
