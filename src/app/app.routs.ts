import { RouterModule, Routes } from '@angular/router';
import { OfertasComponent } from './componentes/ofertas/ofertas.component';
import { MantenimientoComponent } from './componentes/mantenimiento/mantenimiento.component';
import { HomeComponent } from './componentes/home/home.component';

const app_routes: Routes = [
  { path: 'mantenimiento', component: MantenimientoComponent },
  { path: 'ofertas', component: OfertasComponent },
  { path: 'home', component: HomeComponent },
  { path: '**', pathMatch: 'full', redirectTo: 'home' }
];

export const app_routing = RouterModule.forRoot(app_routes);
