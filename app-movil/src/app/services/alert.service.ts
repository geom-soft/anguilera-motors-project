import { Injectable } from '@angular/core';
import { ToastController, LoadingController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  loader = null;

  constructor(
    private toastCtrl: ToastController,
    private loadingCtrl: LoadingController
  ) { }

  async showLoader() {
    this.loader = await this.loadingCtrl.create({
      message: 'Espere un momento...',
      duration: 3000
    });
    await this.loader.present();
  }

  closeLoader() {
    try {
      this.loader.dismiss();
      this.loader = null;
    } catch (e) {}
  }

  async createMessage(message, duration = 3000) {
    const tc = await this.toastCtrl.create({
      message,
      duration
    });
    tc.present();
  }

}
