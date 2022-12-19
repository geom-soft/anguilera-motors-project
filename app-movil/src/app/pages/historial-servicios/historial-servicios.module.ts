import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HistorialServiciosPageRoutingModule } from './historial-servicios-routing.module';

import { HistorialServiciosPage } from './historial-servicios.page';

import { SharedModule } from 'src/app/modules/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HistorialServiciosPageRoutingModule,
    SharedModule
  ],
  declarations: [HistorialServiciosPage]
})
export class HistorialServiciosPageModule {}
