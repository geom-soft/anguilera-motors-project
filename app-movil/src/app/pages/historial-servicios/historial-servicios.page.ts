import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { StorageService } from '../../services/storage.service';
import { ServicioService } from '../../services/servicio.service';

@Component({
  selector: 'app-historial-servicios',
  templateUrl: './historial-servicios.page.html',
  styleUrls: ['./historial-servicios.page.scss'],
})
export class HistorialServiciosPage implements OnInit {

  objSession = null;
  objHistorial = [];


  hoy = new Date();
  fechaInicial = new Date(this.hoy.getFullYear(), this.hoy.getMonth(), 1).toISOString();
  fechaFinal = new Date().toISOString();

  constructor(
    private viajes: ServicioService,
    private storage: StorageService,
    private navCtrl: NavController,
  ) { }

  ngOnInit() {
  }

  async ionViewWillEnter() {
    this.objSession = await this.storage.get('session_driver');
    if (this.objSession) {
      this.cargarHistorial(this.objSession.codigo);
    }
  }

  cargarHistorial(code, refresher = null) {
    this.viajes.getHistorialConductor(code, this.fechaInicial.substring(0,10), this.fechaFinal.substring(0,10))
    .then(data => {
      if (!data.error) {
        this.objHistorial = data.data.results;
        if (refresher) {
          refresher.complete();
        }
      }
    }).catch(e => this.objHistorial = []);
  }

  doRefresh(refresher) {
    this.cargarHistorial(this.objSession.codigo, refresher);
  }

  abrirFicha(id) {
    this.navCtrl.navigateForward('/ficha-servicio', {queryParams: { id }});
  }

}
