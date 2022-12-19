import { Component, OnInit } from '@angular/core';
import { ReportesService } from 'src/app/services/reportes.service';

@Component({
  selector: 'app-conductores',
  templateUrl: './conductores.component.html',
  styleUrls: ['./conductores.component.css']
})
export class ConductoresComponent implements OnInit {

  fechas = null;
  objRegistros = [];
  objRutas = [];

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
    this.reportes.getServiciosConductores(obj)
    .then(data => this.objRegistros = data)
    .catch(e => this.objRegistros = []);
  }

  cargaListaRutas(id) {
    const obj = {
      codigo: id,
      f1: this.fechas[0],
      f2: this.fechas[1]
    };
    this.reportes.getRutasConductor(obj)
    .then(data => this.objRutas = data)
    .catch(e => this.objRutas = []);
  }

}
