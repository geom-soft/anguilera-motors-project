import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StorageService } from './services/storage.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {

  objSession = null;

  public appPages = [
    { title: 'Inicio', url: 'inicio', icon: 'home' },
    { title: 'Historial', url: 'historial-servicios', icon: 'list' },
  ];

  constructor(
    private storage: StorageService,
    private router: Router
  ) {}

   ngOnInit() {
    setTimeout(async () => {
      this.objSession = await this.storage.get('session_driver');
    }, 500);
  }

  salir() {
    this.storage.remove('session_driver');
    this.router.navigateByUrl('login');
  }
  

}
