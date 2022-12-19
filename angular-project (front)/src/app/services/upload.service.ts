import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AlertifyService } from './alertify.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UploadService {

  api = environment.apiUrl;

  constructor(
    private http: HttpClient,
    private alertify: AlertifyService
  ) { }

  uploadFile( file: File, cliente, usuario ) {

    this.alertify.showLoader();

    const url = this.api + `importar/excel/${cliente}/${usuario}`;

    const formData = new FormData();
    formData.append('files', file, file.name);

    return new Promise( (resolve, reject) => {
      this.http.post(url, formData).subscribe( data => {
        if (!data['error']) {
          this.alertify.closeLoader();
          this.alertify.createMessage('¡Se importaron ' + data['data'].total + ' registros correctamente!', 'success');
          resolve(data['data'].total);
        } else {
          this.alertify.closeLoader();
          this.alertify.createMessage('¡Error al leer el archivo!', 'error');
          reject('upload error!');
        }
      }, error => {
        this.alertify.closeLoader();
        this.alertify.createMessage('¡Error al cargar el archivo!', 'error');
        reject('upload error!');
      });
    });
  }





  uploadFileServicios( file: File, cliente ) {

    this.alertify.showLoader();

    const url = this.api + `importar/servicios/${cliente}`;

    const formData = new FormData();
    formData.append('files', file, file.name);

    return new Promise( (resolve, reject) => {
      this.http.post(url, formData).subscribe( data => {
        if (!data['error']) {
          this.alertify.closeLoader();
          this.alertify.createMessage('¡Se importaron ' + data['data'].total + ' registros correctamente!', 'success');
          resolve(data['data'].total);
        } else {
          this.alertify.closeLoader();
          this.alertify.createMessage('¡Error al leer el archivo!', 'error');
          reject('upload error!');
        }
      }, error => {
        this.alertify.closeLoader();
        this.alertify.createMessage('¡Error al cargar el archivo!', 'error');
        reject('upload error!');
      });
    });
  }


  uploadFileEmpleados( file: File, cliente ) {

    this.alertify.showLoader();

    const url = this.api + `importar/empleados/${cliente}`;

    const formData = new FormData();
    formData.append('files', file, file.name);

    return new Promise( (resolve, reject) => {
      this.http.post(url, formData).subscribe( data => {
        if (!data['error']) {
          this.alertify.closeLoader();
          this.alertify.createMessage('¡Se importaron ' + data['data'].total + ' registros correctamente!', 'success');
          resolve(data['data'].total);
        } else {
          this.alertify.closeLoader();
          this.alertify.createMessage('¡Error al leer el archivo!', 'error');
          reject('upload error!');
        }
      }, error => {
        this.alertify.closeLoader();
        this.alertify.createMessage('¡Error al cargar el archivo!', 'error');
        reject('upload error!');
      });
    });
  }

}
