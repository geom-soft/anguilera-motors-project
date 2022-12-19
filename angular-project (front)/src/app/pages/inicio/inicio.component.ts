import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {

  objSession: any;

  constructor(
    private router: Router,
    private cookieService: CookieService
  ) { 
    this.objSession = JSON.parse(atob(this.cookieService.get('_session_user')));
    if (this.objSession.tipo === 'CLIENTE') {
      this.router.navigate(['/mis-servicios']);
    } else {
      this.router.navigate(['/lista-servicios']);
    }
  }

  ngOnInit(): void {
  }

}
