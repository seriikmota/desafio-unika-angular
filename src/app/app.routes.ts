import { Routes } from '@angular/router';
import {HomeComponent} from "./components/home/home.component";
import {EnderecoComponent} from "./components/endereco/endereco.component";


export const routes: Routes = [
  {path: '', redirectTo: 'home', pathMatch: 'full'},
  {path: 'home', component: HomeComponent},
  {path: 'endereco', component: EnderecoComponent},
  {path: 'monitorador',
    loadChildren: () => import('./features/monitorador/monitorador.module').then(m => m.MonitoradorModule)}
];
