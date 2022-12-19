import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AlertifyService } from './alertify.service';
import { doGet } from 'src/app/helpers/doGet.helper';
import { doPostObj, doPostObjData } from 'src/app/helpers/doPost.helper';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ViajesService {

  api = environment.apiUrl;

  constructor(
    private http: HttpClient,
    private alertify: AlertifyService
  ) { }

  getViaje(id) {
    const url = this.api + 'viaje/id/' + id;
    return doGet(url, this.http, this.alertify);
  }

  getViajes() {
    const url = this.api + 'viaje/vigentes';
    return doGet(url, this.http, this.alertify, false); // true para mostrar loader
  }

  getViajesFiltro(cliente, estatus) {
    const url = this.api + `viaje/filtro/${cliente}/${estatus}`;
    return doGet(url, this.http, this.alertify, false); // true para mostrar loader
  }

  getViajesCliente(code) {
    const url = this.api + 'viaje/vigentes_cliente/' + code;
    return doGet(url, this.http, this.alertify, false); // true para mostrar loader
  }

  postViaje(obj, nueva: boolean) {
    let url;
    if (nueva) {
      url = this.api + 'viaje/insertar';
    } else {
      url = this.api + 'viaje/actualizar';
    }
    return doPostObjData(url, this.http, obj, this.alertify);
  }

  cancelaViaje(id) {
    const url = this.api + `viaje/cancelar/${id}`;
    return new Promise( (resolve, reject) => {
      this.alertify.createConfirm('Confirmar', '¿Desea cancelar el servicio realmente?')
      .then( res => {
        if (res) {
          doGet(url, this.http, this.alertify)
          .then( () => {
            this.alertify.createMessage('El servicio fué cancelado correctamente', 'success');
            resolve(null);
          });
        } else {
          reject();
        }
      }).catch(e => reject());
    });
  }

  getOtrosViajes() {
    const url = this.api + 'viaje/otros';
    return doGet(url, this.http, this.alertify, false); // true para mostrar loader
  }

  getOtrosViajesCliente(code) {
    const url = this.api + 'viaje/otros_cliente/' + code;
    return doGet(url, this.http, this.alertify, false); // true para mostrar loader
  }

  getViajesNoAsignados() {
    const url = this.api + 'viaje/no_asignados';
    return doGet(url, this.http, this.alertify, false); // true para mostrar loader
  }

  postAsignar(obj) {
    const url = this.api + 'viaje/asignar';
    return doPostObj(url, this.http, obj, this.alertify);
  }

  eliminarViaje(id) {
    const url = this.api + `viaje/eliminar/${id}`;
    return new Promise( (resolve, reject) => {
      this.alertify.createConfirm('Confirmar', '¿Desea eliminar el servicio realmente?')
      .then( res => {
        if (res) {
          doGet(url, this.http, this.alertify)
          .then( () => {
            this.alertify.createMessage('El servicio fué eliminado correctamente', 'success');
            resolve(null);
          });
        } else {
          reject();
        }
      }).catch(e => reject());
    });
  }

  serviciosHoy() {
    const url = this.api + 'viaje/today';
    return doGet(url, this.http, this.alertify, false); // true para mostrar loader
  }

}
