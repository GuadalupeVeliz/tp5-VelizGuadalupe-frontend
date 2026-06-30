import { Routes } from '@angular/router';
import { TraduccionComponent } from './traduccion/traduccion.component';
import { TransaccionComponent } from './transaccion/transaccion.component';

export const routes: Routes = [
  {path:'',component: TraduccionComponent, pathMatch: 'full' },
  {path: 'transaccion',component: TransaccionComponent}
];
