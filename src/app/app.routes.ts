import { Routes } from '@angular/router';

export const routes: Routes = [
  {path: '', redirectTo: 'monitorador', pathMatch: 'full'},
  {path: 'monitorador',
    loadChildren: () => import('./features/monitorador/monitorador.module').then(m => m.MonitoradorModule)},
];
