import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ListagemEnderecoComponent} from "./listagem-endereco/listagem-endereco.component";

const routes: Routes = [
  {path: '', component: ListagemEnderecoComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EnderecoRoutingModule { }
