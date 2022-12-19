import { Component, OnInit } from '@angular/core';
import { ReportesService } from 'src/app/services/reportes.service';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.css']
})
export class ClientesComponent implements OnInit {

  fechas = null;
  objRegistros = [];

  constructor(
    private reportes: ReportesService
  ) { }

  ngOnInit(): void {}

  getDates(e) {
    try {
      this.fechas = e;
      const obj = {
        f1: this.fechas[0],
        f2: this.fechas[1]
      };
      this.obtenerRegistros(obj);
    } catch (e) {}
  }

  obtenerRegistros(obj) {
    this.reportes.getServiciosClientes(obj)
    .then(data => this.objRegistros = data)
    .catch(e => this.objRegistros = []);
  }

}
