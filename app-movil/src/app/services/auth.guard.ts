import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { CanLoad } from '@angular/router';
import { StorageService } from './storage.service';


@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanLoad {

  objSession: any;

  constructor(
    private router: Router,
    private storage: StorageService
  ) { }

  checkSession() {
    // FIX: se agrega un tiempo de espera antes de cargar el storage para que no de NULL
    setTimeout(async () => {
      const session = await this.storage.get('session_driver');
      if (session) {
        this.objSession = session;
        // console.log(session);
      } else {
        this.objSession = null;
        this.router.navigate(['login']);
      }
    }, 500);
  }

  canLoad(): boolean {

    this.checkSession();
    return true;

  }

}
