import { Component, OnInit } from '@angular/core';
import { ReportesService } from 'src/app/services/reportes.service';
import { ClientesService } from 'src/app/services/clientes.service';
import { ConductoresService } from 'src/app/services/conductores.service';
declare var $: any;

@Component({
  selector: 'app-general',
  templateUrl: './general.component.html',
  styleUrls: ['./general.component.css']
})
export class GeneralComponent implements OnInit {

  fechas = null;
  estatus = 'FINALIZADO';
  cliente = 'TODOS';
  conductor = 'TODOS';
  objRegistros = [];
  objClientes = [];
  objConductores = [];

  constructor(
    private reportes: ReportesService,
    private clientes: ClientesService,
    private conductores: ConductoresService
  ) { }

  cargarClientes() {
    this.clientes.getClientes()
    .then(data => {
      this.objClientes = data;
    }).catch(e => this.objClientes = []);
  }

  cargarConductores() {
    this.conductores.getConductores()
    .then(data => {
      this.objConductores = data;
    }).catch(e => this.objConductores = []);
  }
 
  ngOnInit(): void {
    this.cargarClientes();
    this.cargarConductores();
  }

  getDates(e) {
    try {
      this.fechas = e;
      const obj = {
        estatus: this.estatus,
        cliente: this.cliente,
        conductor: this.conductor,
        f1: this.fechas[0],
        f2: this.fechas[1]
      };
      this.obtenerRegistros(obj);
    } catch (e) {}
  }

  selectChange() {
    const obj = {
      estatus: this.estatus,
      cliente: this.cliente,
      conductor: this.conductor,
      f1: this.fechas[0],
      f2: this.fechas[1]
    };
    this.obtenerRegistros(obj);
  }

  obtenerRegistros(obj) {
    this.reportes.getListadoServicios(obj)
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
