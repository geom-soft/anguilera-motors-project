import { Injectable } from '@angular/core';
import * as alertify from 'alertifyjs';
// declare const alertify: any;

@Injectable({
  providedIn: 'root'
})
export class AlertifyService {

  loader = null;

  showLoader() {
    this.loader = alertify.alert(
      '<div align="center"><p>Espera un momento...</p><i class="fa fa-cog fa-spin fa-3x"></i></div>'
    ).set({basic: true, closable: false});
  }

  closeLoader() {
    try {
      this.loader.close();
      this.loader = null;
    } catch (e) {}
  }

  createAlert(title, message, closable = true) {
    alertify.dialog('alert')
    .set({
      closable,
      message,
      title
    }).show();
  }

  createConfirm(title, message) {
    return new Promise( (resolve, reject) => {
      alertify.dialog('confirm')
      .set({
        closable: false,
        message,
        title
      })
      .setting({
        onok: () => resolve(true),
        oncancel: () => reject(false)
      }).show();
    });
  }

  createMessage(message, type = 'normal', time = 3) {
    alertify.set('notifier', 'position', 'top-right');
    alertify.notify(message, type, time);
  }
}
