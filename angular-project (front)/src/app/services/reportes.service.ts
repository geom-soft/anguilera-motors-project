import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AlertifyService } from './alertify.service';
import { doPostObjLoad } from 'src/app/helpers/doPost.helper';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ReportesService {

  api = environment.apiUrl;

  constructor(
    private http: HttpClient,
    private alertify: AlertifyService
  ) { }

  getListadoServicios(obj) {
    const url = this.api + 'reporte/listado_servicios';
    return doPostObjLoad(url, this.http, obj, this.alertify);
  }

  getServiciosConductores(obj) {
    const url = this.api + 'reporte/servicios_conductores';
    return doPostObjLoad(url, this.http, obj, this.alertify);
  }

  getServiciosClientes(obj) {
    const url = this.api + 'reporte/servicios_clientes';
    return doPostObjLoad(url, this.http, obj, this.alertify);
  }



  getRutasConductor(obj) {
    const url = this.api + 'reporte/rutas_conductor';
    return doPostObjLoad(url, this.http, obj, this.alertify);
  }

  getPersonalizado(obj) {
    const url = this.api + 'reporte/personalizado';
    return doPostObjLoad(url, this.http, obj, this.alertify);
  }


}
