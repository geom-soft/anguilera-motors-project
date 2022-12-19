import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Pipe({
  name: 'estatusActivo'
})
export class EstatusActivoPipe implements PipeTransform {

  constructor(
    private sanatizer: DomSanitizer
  ) {}

  transform(value: any): any {
    let html;
    switch (value) {
      case '1':   html = `<span class="label bg-orange" title="Usuario con acceso habilitado">Activo</span>`;  break;
      default:    html = `<span class="label bg-navy" title="Usuario con acceso deshabilitado">Inactivo</span>`;  break;
    }

    return this.sanatizer.bypassSecurityTrustHtml(html);
  }

}
