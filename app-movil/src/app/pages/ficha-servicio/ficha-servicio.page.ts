import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavController, AlertController } from '@ionic/angular';
import { StorageService } from '../../services/storage.service';
import { ServicioService } from '../../services/servicio.service';

@Component({
  selector: 'app-ficha-servicio',
  templateUrl: './ficha-servicio.page.html',
  styleUrls: ['./ficha-servicio.page.scss'],
})
export class FichaServicioPage implements OnInit {

  id = null;
  objSession = null;
  objConductores = [];
  objViaje = null;
  objRutaEntrada = [];
  objRutaSalida = [];
  concluyoEntradas = true;
  concluyoSalidas = true;

  constructor(
    private route: ActivatedRoute,
    private service: ServicioService,
    private storage: StorageService,
    private navCtrl: NavController,
    private alertCtrl: AlertController
  ) { }

  ngOnInit() {
  }

  async ionViewDidEnter() {
    this.objSession = await this.storage.get('session_driver');
    this.route.queryParams.subscribe((params) => {  
      this.id = params.id;
      this.cargarConductores();
      this.cargarDatosServicio(this.id);
      this.cargarRutaPasajeros(this.id);
    });
  }

  async cargarConductores() {
    this.objConductores = await this.service.getConductores();
    // console.log(this.objConductores);
  }

  async cargarDatosServicio(id) {
    this.objViaje = await this.service.getViaje(id);
    // console.log(this.objViaje);
  }

  cargarRutaPasajeros(id) {
    setTimeout(async () => {
      this.objRutaEntrada = await this.service.getRutaEntrada(id);
      this.objRutaSalida = await this.service.getRutaSalida(id);
      // console.log(this.objRutaEntrada);
      // console.log(this.objRutaSalida);
      this.checkAbordo();
    }, 400);
  }

  checkAbordo() {
    this.concluyoEntradas = true;
    this.objRutaEntrada.forEach(item => {
      if (!item.abordo_entrada) {
        this.concluyoEntradas = false;
      }
    });
    this.concluyoSalidas = true;
    this.objRutaSalida.forEach(item => {
      if (!item.abordo_salida) {
        this.concluyoSalidas = false;
      }
    });
  }

  llamarTelefono(tel) {
    if (tel) {
      window.open('tel:' + tel);
    }
  }

  irMapa(lng, lat) {
    try {
      console.log('MAP: ', {lng, lat});
      window.open(`geo:${lat},${lng}?q=${lat},${lng}(Marcador)`, '_system'); // android
      // window.open(`https://www.google.com/maps/search/?api=1&query=${lat},${lng}`, '_system');
      // window.open('maps://?q=' + lat + ',' + lng, '_system');  // ios
    } catch (e) {
      console.log(e);
    }
  }

  abordarEntrada (id, a) {
    const obj = {id, a};
    this.service.abordarEntrada(obj);
    setTimeout(() => {
      this.cargarRutaPasajeros(this.id);
    }, 500);
  }

   abordarSalida (id, a) {
    const obj = {id, a};
    this.service.abordarSalida(obj);
    setTimeout(() => {
      this.cargarRutaPasajeros(this.id);
    }, 500);
  }

  iniciar() {
    this.service.postEstatus(this.id, 'INICIADO')
    .then(() => {
      setTimeout(() => {
        this.cargarDatosServicio(this.id);
        this.cargarRutaPasajeros(this.id);
      }, 400);
    }).catch(e => console.log(e));
  }

  terminarIntermedio() {
    this.service.postEstatusIntermedio(this.id)
    .then(() => {
      setTimeout(() => {
        this.cargarDatosServicio(this.id);
        this.cargarRutaPasajeros(this.id);
      }, 400);
    }).catch(e => console.log(e));
  }

  terminar() {
    this.service.postEstatus(this.id, 'TERMINADO')
    .then(() => {
      setTimeout(() => {
        this.cargarDatosServicio(this.id);
        this.cargarRutaPasajeros(this.id);
        this.navCtrl.pop();
      }, 400);
    }).catch(e => console.log(e));
  }

  aceptar(id) {
    this.service.postEstatus(id, 'ACEPTADO')
    .then(() => {
      setTimeout(() => {
        this.cargarDatosServicio(this.id);
        this.cargarRutaPasajeros(this.id);
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
        this.cargarDatosServicio(this.id);
        this.cargarRutaPasajeros(this.id);
      }, 400);
    }).catch(e => console.log(e));
  }

}
