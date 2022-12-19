import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FichaServicioPage } from './ficha-servicio.page';

const routes: Routes = [
  {
    path: '',
    component: FichaServicioPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FichaServicioPageRoutingModule {}
