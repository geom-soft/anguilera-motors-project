import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FichaServicioPageRoutingModule } from './ficha-servicio-routing.module';

import { FichaServicioPage } from './ficha-servicio.page';
import { SharedModule } from '../../modules/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FichaServicioPageRoutingModule,
    SharedModule
  ],
  declarations: [FichaServicioPage]
})
export class FichaServicioPageModule {}
