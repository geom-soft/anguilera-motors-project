import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AlertifyService } from './alertify.service';
import { doPostForm, doPostObj } from 'src/app/helpers/doPost.helper';
import { doGet, doDelete } from 'src/app/helpers/doGet.helper';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RutasService {

  api = environment.apiUrl;

  constructor(
    private http: HttpClient,
    private alertify: AlertifyService
  ) { }

  getRuta(id) {
    const url = this.api + 'ruta/id/' + id;
    return doGet(url, this.http, this.alertify);
  }

  getRutas(id) {
    const url = this.api + 'ruta/todos/' + id;
    return doGet(url, this.http, this.alertify, false); // true para mostrar loader
  }

  postRuta(data) {
    const url = this.api + 'ruta/insertar';
    return doPostForm(url, this.http, data, this.alertify);
  }

  deleteRuta(id) {
    const url = this.api + 'ruta/eliminar/' + id;
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

}
