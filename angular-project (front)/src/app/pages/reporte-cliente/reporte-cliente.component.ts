import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { ReportesService } from 'src/app/services/reportes.service';
declare var $: any;

@Component({
  selector: 'app-reporte-cliente',
  templateUrl: './reporte-cliente.component.html',
  styleUrls: ['./reporte-cliente.component.css']
})
export class ReporteClienteComponent implements OnInit {

  fechas = null;
  cliente = '';
  objRegistros = [];
  objClientes = [];

  objSession = null;

  constructor(
    private cookieService: CookieService,
    private reportes: ReportesService,
  ) {
    this.objSession = JSON.parse(atob(this.cookieService.get('_session_user')));
    this.cliente = this.objSession.codigo;
  }

  ngOnInit(): void { }

  getDates(e) {
    try {
      this.fechas = e;
      const obj = {
        cliente: this.cliente,
        f1: this.fechas[0],
        f2: this.fechas[1]
      };
      this.obtenerRegistros(obj);
    } catch (e) {}
  }

  selectChange() {
    const obj = {
      cliente: this.cliente,
      f1: this.fechas[0],
      f2: this.fechas[1]
    };
    this.obtenerRegistros(obj);
  }

  obtenerRegistros(obj) {
    if (this.cliente === '') {
      return;
    }
    this.reportes.getPersonalizado(obj)
    .then(data => this.objRegistros = data)
    .catch(e => this.objRegistros = []);
  }
  

  exportar() {
    $('#tabla-reporte').table2excel({
      name: 'Reporte de servicios',
      filename: 'reporte',
      fileext: '.xls'
    });
  }


}
