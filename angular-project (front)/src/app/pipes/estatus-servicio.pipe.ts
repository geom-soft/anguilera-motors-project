import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Pipe({
  name: 'estatusServicio'
})
export class EstatusServicioPipe implements PipeTransform {

  constructor(
    private sanatizer: DomSanitizer
  ) {}

  transform(value: any): any {
    let html;
    switch (value) {
      case 'CANCELADO':   html = `<span class="label bg-red">CANCELADO</span>`;  break;
      case 'ACEPTADO':   html = `<span class="label bg-purple">ACEPTADO</span>`;  break;
      case 'INICIADO':   html = `<span class="label bg-orange">EN PROCESO</span>`;  break;
      case 'TERMINADO':   html = `<span class="label bg-green">TERMINADO</span>`;  break;
      case 'PENDIENTE':   html = `<span class="label label-info">PENDIENTE</span>`;  break;
      case 'ASIGNADO':   html = `<span class="label label-primary">ASIGNADO</span>`;  break;
      case 'NOTA':   html = `<span class="label label-warning">MENSAJE</span>`;  break;
      default:    html = `<span class="label label-info">PENDIENTE</span>`;  break;
    }

    return this.sanatizer.bypassSecurityTrustHtml(html);
  }

}
