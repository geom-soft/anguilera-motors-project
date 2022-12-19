import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { environment } from 'src/environments/environment';
declare var $: any;

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  env = environment;
  objSession: any;

  constructor(
    public router: Router,
    private cookieService: CookieService
  ) {
    if (!this.cookieService.check('_session_user')) {
      this.router.navigate(['/login']);
    } else {
      this.objSession = JSON.parse(atob(this.cookieService.get('_session_user')));
    }
  }

  ngOnInit(): void {
    $('[data-toggle="control-sidebar"]').controlSidebar();
    $('[data-toggle="push-menu"]').pushMenu();
  }

  sidebar() {
    $('body').pushMenu('toggle');
  }

  control() {
    $('body').controlSidebar('toggle');
  }

  cerrar_sesion() {
    this.cookieService.delete('_session_user');
    this.router.navigate(['/login']);
  }

}
