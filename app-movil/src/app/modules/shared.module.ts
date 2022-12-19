import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import { MomentPipe } from '../pipes/moment.pipe';


@NgModule({
  imports: [
    CommonModule
  ],
  exports: [
    MomentPipe,
  ],
  declarations: [
    MomentPipe,
  ]
})
export class SharedModule {}