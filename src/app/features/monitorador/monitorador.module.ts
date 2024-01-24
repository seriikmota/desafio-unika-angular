import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MonitoradorRoutingModule } from './monitorador-routing.module';
import {CadastroComponent} from "./cadastro/cadastro.component";
import {ListagemComponent} from "./listagem/listagem.component";


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MonitoradorRoutingModule,
    CadastroComponent,
    ListagemComponent
  ]
})
export class MonitoradorModule { }
