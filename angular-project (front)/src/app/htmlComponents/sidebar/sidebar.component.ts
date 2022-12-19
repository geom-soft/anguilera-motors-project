import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
declare var $: any;

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  objSession: any;
  isAdmin = true;
  isClient = false;

  constructor(
    private cookieService: CookieService
  ) {
    this.objSession = JSON.parse(atob(this.cookieService.get('_session_user')));
    if (this.objSession.tipo === 'ADMIN') {
      this.isAdmin = true;
      this.isClient = false;
    } else {
      this.isAdmin = false;
      this.isClient = true;
    }
  }

  ngOnInit(): void {
    $('.sidebar-menu').tree();
  }

}
