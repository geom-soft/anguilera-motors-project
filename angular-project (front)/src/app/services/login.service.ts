import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AlertifyService } from './alertify.service';
import { doGet } from 'src/app/helpers/doGet.helper';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  api = environment.apiUrl;

  constructor(
    private http: HttpClient,
    private alertify: AlertifyService
  ) { }

  getUsuarios() {
    const url = this.api + 'usuario/todos';
    return doGet(url, this.http, this.alertify);
  }

  // postLogin(obj: any) {
  //   const url = this.api + 'usuario/login';

  //   const body = new URLSearchParams();
  //   body.append('codigo_usuario', obj.codigo_usuario);
  //   body.append('nip', obj.nip);

  //   const headers = new HttpHeaders()
  //                   .set('Content-Type', 'application/x-www-form-urlencoded');

  //   return new Promise( (resolve, reject) => {
  //     this.http.post(url, body.toString(), {headers})
  //     .subscribe(data => {
  //       if (!data['error'] && data['data'].results) {
  //         this.alertify.createMessage('Accesando...', 'success');
  //         resolve(data['data'].results);
  //       } else {
  //         this.alertify.createMessage('¡Error de autenticación!', 'error');
  //         reject();
  //       }
  //     }, () => {
  //       this.alertify.createMessage('¡Error de autenticación!', 'error');
  //       reject();
  //     });
  //   });
  // }

  postLogin(obj: any) {
    const url = this.api + 'login';

    const body = new URLSearchParams();
    body.append('acceso', obj.acceso);
    body.append('nip', obj.nip);

    const headers = new HttpHeaders()
                    .set('Content-Type', 'application/x-www-form-urlencoded');

    return new Promise( (resolve, reject) => {
      this.http.post(url, body.toString(), {headers})
      .subscribe(data => {
        if (!data['error'] && data['data'].results) {
          if (data['data'].results.tipo === 'ADMIN') {
            this.alertify.createMessage('Accesando como administrador...', 'success');
          } else {
            this.alertify.createMessage('Accesando...', 'success');
          }
          resolve(data['data'].results);
        } else {
          this.alertify.createMessage('¡Error de autenticación!', 'error');
          reject();
        }
      }, () => {
        this.alertify.createMessage('¡Error de autenticación!', 'error');
        reject();
      });
    });
  }

}
