import { Component, OnInit } from '@angular/core';
import { Platform } from '@ionic/angular';
import { Router } from '@angular/router';
import { ToastController, LoadingController } from '@ionic/angular';
import { StorageService } from 'src/app/services/storage.service';
import { ServicioService } from 'src/app/services/servicio.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  anio = new Date().getFullYear();

  objLogin = {
    user: '',
    nip: ''
  };

  objSession = null;

  constructor(
    private service: ServicioService,
    private platform: Platform,
    private router: Router,
    private storage: StorageService,
    private loadingCtrl: LoadingController,
    private toastCtrl: ToastController
  ) { }

  ngOnInit() {
    this.platform.ready().then(() => this.checkSession()).catch();
  }

  async checkSession() {
    const session = await this.storage.get('session_driver');
      if (session) {
        console.log('Is in');
        this.router.navigate(['inicio']);
      } else {
        console.log('Is out');
      }
  }

  async doLogin() {
    const loader = await this.loadingCtrl.create({message: 'Espere un momento...'});
    loader.present();
    this.service.postLogin(this.objLogin)
    .then(async (data: any) => {
      if (data) {
        // this.sessionProvider.session$.emit(data);
        console.log(data);
        this.storage.set('session_driver', data);
        this.router.navigate(['inicio']);
      } else {
        const tc = await this.toastCtrl.create({
          message: 'Error de acceso. Intente nuevamente por favor.',
          duration: 3000
        });
        tc.present();
      }
      loader.dismiss();
    }).catch(e => {
      loader.dismiss();
    });
  }

}
