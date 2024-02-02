import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ListagemMonitoradorComponent} from "./listagem-monitorador/listagem-monitorador.component";

const routes: Routes = [
  {path: '', component: ListagemMonitoradorComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MonitoradorRoutingModule { }
