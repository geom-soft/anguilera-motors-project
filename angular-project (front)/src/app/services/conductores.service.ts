import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AlertifyService } from './alertify.service';
import { doPostForm, doPostObj } from 'src/app/helpers/doPost.helper';
import { doGet, doDelete } from 'src/app/helpers/doGet.helper';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ConductoresService {

  api = environment.apiUrl;

  constructor(
    private http: HttpClient,
    private alertify: AlertifyService
  ) { }

  getConductor(id) {
    const url = this.api + 'conductor/id/' + id;
    return doGet(url, this.http, this.alertify);
  }

  getConductores() {
    const url = this.api + 'conductor/todos';
    return doGet(url, this.http, this.alertify, false); // true para mostrar loader
  }

  select2Conductores() {
    const url = this.api + 'conductor/select2';
    return doGet(url, this.http, this.alertify, false); // true para mostrar loader
  }

  postConductor(data, nueva: boolean) {
    let url;
    if (nueva) {
      url = this.api + 'conductor/insertar';
    } else {
      url = this.api + 'conductor/actualizar';
    }
    return doPostForm(url, this.http, data, this.alertify);
  }

  deleteConductor(id) {
    const url = this.api + 'conductor/eliminar/' + id;
    return new Promise( (resolve, reject) => {
      this.alertify.createConfirm('Confirmar', '¿Eliminar registro?')
      .then( res => {
        if (res) {
          doDelete(url, this.http, this.alertify)
          .then( () => {
            resolve();
          });
        } else {
          reject();
        }
      }).catch(e => reject());
    });
  }

  resetNIP(code) {
    const url = this.api + 'conductor/reset/' + code;
    return new Promise( (resolve, reject) => {
      this.alertify.createConfirm('Confirmar', '¿Restaurar NIP?')
      .then( res => {
        if (res) {
          doGet(url, this.http, this.alertify)
          .then( () => {
            this.alertify.createMessage('El NIP se restauró correctamente', 'success');
            resolve();
          });
        } else {
          reject();
        }
      }).catch(e => reject());
    });
  }

  // postPerfil(obj: any) {
  //   const url = this.api + 'usuario/perfil';
  //   return doPostObj(url, this.http, obj, this.alertify);
  // }
}
