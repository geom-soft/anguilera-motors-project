import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ToastController } from '@ionic/angular';
import { AlertService } from './alert.service';
import { doGet } from 'src/app/helpers/doGet.helper';
import { doPostObj, doPostObjNoData } from 'src/app/helpers/doPost.helper';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ServicioService {

  api = environment.API_URL;

  constructor(
    private http: HttpClient,
    private toastCtrl: ToastController,
    private alerts: AlertService
  ) { }

  getConductor(id) {
    const url = this.api + 'conductor/id/' + id;
    return doGet(url, this.http, this.alerts);
  }

  getConductores() {
    const url = this.api + 'conductor/select2';
    return doGet(url, this.http, this.alerts, false); // true para mostrar loader
  }

  // postPerfil(obj: any) {
  //   const url = this.api + 'negocio/perfil';
  //   return doPostObj(url, this.http, obj, this.alerts);
  // }

  // postInformacion(form) {
  //   const url = this.api + 'negocio/informacion';
  //   return doPostForm(url, this.http, form, this.alerts);
  // }

  postLogin(obj) {
    const url = this.api + 'login/conductor';

    const body = new URLSearchParams();
    body.append('user', obj.user);
    body.append('nip', obj.nip);

    const headers = new HttpHeaders()
                    .set('Content-Type', 'application/x-www-form-urlencoded');

    return new Promise((resolve, reject) => {
      this.http.post(url, body.toString(), {headers})
      .subscribe(async (data) => {
        if (!data['error'] && data['data'].results) {
          const tc = await this.toastCtrl.create({
            message: 'Accesando...',
            duration: 3000
          });
          tc.present();
          resolve(data['data'].results);
        } else {
          const tc = await this.toastCtrl.create({
            message: '¡Error de autenticación!',
            duration: 3000
          });
          tc.present();
          reject();
        }
      }, async (e) => {
        const tc = await this.toastCtrl.create({
          message: '¡Error de autenticación!',
          duration: 3000
        });
        tc.present();
        reject();
      });
    });
  }







  getViaje(id) {
    const url = this.api + 'viaje/id/' + id;
    return doGet(url, this.http, this.alerts, false);
  }

  getViajesConductor(code) {
    const url = this.api + 'viaje/conductor/' + code;
    return doGet(url, this.http, this.alerts, false); // true para mostrar loader
  }

  getHistorialConductor(code, fecha1, fecha2) {
    const obj = {code, fecha1, fecha2};
    const url = this.api + 'viaje/historial';
    return doPostObjNoData(url, this.http, obj, this.alerts);
  }

  getRutaPasajeros(id) {
    const url = this.api + 'ruta/todos/' + id;
    return doGet(url, this.http, this.alerts, false); // true para mostrar loader
  }

  getRutaEntrada(id) {
    const url = this.api + 'ruta/entrada/' + id;
    return doGet(url, this.http, this.alerts, false); // true para mostrar loader
  }

  getRutaSalida(id) {
    const url = this.api + 'ruta/salida/' + id;
    return doGet(url, this.http, this.alerts, false); // true para mostrar loader
  }

  abordarEntrada(obj) {
    const url = this.api + 'ruta/abordar_entrada';
    return doPostObjNoData(url, this.http, obj, this.alerts);
  }

  abordarSalida(obj) {
    const url = this.api + 'ruta/abordar_salida';
    return doPostObjNoData(url, this.http, obj, this.alerts);
  }

  postEstatus(idservicio, estatus) {
    const obj = {idservicio, estatus};
    const url = this.api + 'viaje/estatus';
    return doPostObj(url, this.http, obj, this.alerts);
  }

  postEstatusIntermedio(idservicio) {
    const obj = {idservicio};
    const url = this.api + 'viaje/estatus_intermedio';
    return doPostObj(url, this.http, obj, this.alerts);
  }

  postDeclinar(obj) {
    const url = this.api + 'viaje/declinar';
    return doPostObj(url, this.http, obj, this.alerts);
  }

}
