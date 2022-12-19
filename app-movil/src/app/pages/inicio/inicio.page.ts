import { Component, OnInit } from '@angular/core';
import { NavController, AlertController } from '@ionic/angular';
import { StorageService } from '../../services/storage.service';
import { ServicioService } from '../../services/servicio.service';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.page.html',
  styleUrls: ['./inicio.page.scss'],
})
export class InicioPage implements OnInit {

  objSession = null;

  objViajes = [];
  objConductores = [];

  constructor(
    private service: ServicioService,
    private storage: StorageService,
    private navCtrl: NavController,
    private alertCtrl: AlertController
  ) { }

  ngOnInit() {
  }

  async ionViewWillEnter() {
    this.objSession = await this.storage.get('session_driver');
    // console.log(this.objSession);
    this.cargarViajes(this.objSession.codigo);
    this.cargarConductores();
  }

  async cargarViajes(id) {
    this.objViajes = await this.service.getViajesConductor(id);
    // console.log(this.objViajes);
  }

  doRefresh(ev) {
    this.cargarViajes(this.objSession.codigo);
    setTimeout(() => {
      ev.target.complete();
    }, 500);
  }

  async cargarConductores() {
    this.objConductores = await this.service.getConductores();
  }

  abrirFicha(id) {
    this.navCtrl.navigateForward('/ficha-servicio', {queryParams: { id }});
  }

  aceptar(id) {
    this.service.postEstatus(id, 'ACEPTADO')
    .then(() => {
      setTimeout(() => {
        this.cargarViajes(this.objSession.codigo);
      }, 400);
    }).catch(e => console.log(e));
  }

  async rechazar(id) {
    const radios = [];
    this.objConductores.forEach(item => {
      if (item.id !== this.objSession.codigo) {
        radios.push({
          type: 'radio',
          label: item.text,
          value: item.id
        });
      }
    });
    const declineAlert = await this.alertCtrl.create({
      header: 'Nuevo conductor',
      subHeader: 'Para continuar reasigna el servicio a otro conductor que pueda atenderlo.',
      inputs: radios,
      buttons: [
        { text: 'Cancelar', role: 'cancel' },
        { text: 'Continuar', handler: (nuevo_conductor) => {
          if (nuevo_conductor) {
            this.procedeDeclinar(nuevo_conductor, id);
            return true;
          }
          return false;
        }}
      ]
    });
    await declineAlert.present();
  }

  procedeDeclinar(code, idserv) {
    const payload = {
      idservicio: idserv,
      conductor: this.objSession.codigo,
      nuevo_conductor: code
    };
    this.service.postDeclinar(payload)
    .then(() => {
      setTimeout(() => {
        this.cargarViajes(this.objSession.codigo);
      }, 400);
    }).catch(e => console.log(e));
  }

}
