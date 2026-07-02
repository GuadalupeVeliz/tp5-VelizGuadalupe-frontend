import { Routes } from '@angular/router';
import { TraduccionComponent } from './traduccion/traduccion.component';
import { TransaccionComponent } from './transaccion/transaccion.component';
import { PublicacionComponent } from './publicacion/publicacion.component';

export const routes: Routes = [
  { path: '', component: TraduccionComponent, pathMatch: 'full' },
  { path: 'traducciones', component: TraduccionComponent },
  { path: 'transacciones', component: TransaccionComponent },
  { path: 'publicaciones', component: PublicacionComponent }
];
