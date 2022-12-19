import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HistorialServiciosPage } from './historial-servicios.page';

const routes: Routes = [
  {
    path: '',
    component: HistorialServiciosPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HistorialServiciosPageRoutingModule {}
