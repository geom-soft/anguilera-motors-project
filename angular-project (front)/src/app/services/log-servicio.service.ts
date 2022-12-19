import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AlertifyService } from 'src/app/services/alertify.service';
import { doGet } from 'src/app/helpers/doGet.helper';
import { doPostObjNoData } from 'src/app/helpers/doPost.helper';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LogServicioService {

  api = environment.apiUrl;

  constructor(
    private http: HttpClient,
    private alertify: AlertifyService
  ) { }

  getLog(id) {
    const url = this.api + 'viaje/log/' + id;
    return doGet(url, this.http, this.alertify);
  }

  postLog(obj) {
    const url = this.api + 'viaje/log';
    return doPostObjNoData(url, this.http, obj);
  }
}
