import { Component, OnInit } from '@angular/core';
import { ReportesService } from 'src/app/services/reportes.service';
import { ClientesService } from 'src/app/services/clientes.service';
declare var $: any;

@Component({
  selector: 'app-personalizado',
  templateUrl: './personalizado.component.html',
  styleUrls: ['./personalizado.component.css']
})
export class PersonalizadoComponent implements OnInit {

  fechas = null;
  cliente = '';
  objRegistros = [];
  objClientes = [];

  constructor(
    private reportes: ReportesService,
    private clientes: ClientesService
  ) { }

  ngOnInit(): void {
    this.cargarClientes();
  }

  cargarClientes() {
    this.clientes.getClientes()
    .then(data => {
      this.objClientes = data;
    }).catch(e => this.objClientes = []);
  }

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
