import { Routes } from '@angular/router';
import {HomeComponent} from "./components/home/home.component";

export const routes: Routes = [
  {path: '', redirectTo: 'home', pathMatch: 'full'},
  {path: 'home', component: HomeComponent},
  {path: 'monitorador',
    loadChildren: () => import('./features/monitorador/monitorador.module').then(m => m.MonitoradorModule)},
  {path: 'endereco',
    loadChildren: () => import('./features/endereco/endereco.module').then(m => m.EnderecoModule)}
];
