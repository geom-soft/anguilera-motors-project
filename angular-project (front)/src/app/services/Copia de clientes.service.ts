import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AlertifyService } from './alertify.service';
import { doPostForm, doPostObj } from 'src/app/helpers/doPost.helper';
import { doGet, doDelete } from 'src/app/helpers/doGet.helper';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ClientesService {

  api = environment.apiUrl;

  constructor(
    private http: HttpClient,
    private alertify: AlertifyService
  ) { }

  getCliente(id) {
    const url = this.api + 'cliente/id/' + id;
    return doGet(url, this.http, this.alertify);
  }

  getClientes() {
    const url = this.api + 'cliente/todos';
    return doGet(url, this.http, this.alertify, false); // true para mostrar loader
  }

  postCliente(data, nueva: boolean) {
    let url;
    if (nueva) {
      url = this.api + 'cliente/insertar';
    } else {
      url = this.api + 'cliente/actualizar';
    }
    return doPostForm(url, this.http, data, this.alertify);
  }

  deleteCliente(id) {
    const url = this.api + 'cliente/eliminar/' + id;
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
    const url = this.api + 'cliente/reset/' + code;
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
}
