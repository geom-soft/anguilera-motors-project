import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { LoginService } from 'src/app/services/login.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  global = environment;

  anio = new Date().getFullYear();
  error = false;

  objUsuarios: any;

  objLogin = {
    acceso: '',
    nip: ''
  };

  constructor(
    public router: Router,
    private cookieService: CookieService,
    private login: LoginService
  ) { }

  ngOnInit(): void {
    this.validation();
    // this.obtenerUsuarios();
  }

  validation() {
    if (this.cookieService.check('_session_user')) {
      this.router.navigate(['/inicio']);
    }
  }

  doLogin() {
    this.error = false;
    this.login.postLogin(this.objLogin)
    .then( data => {
      this.cookieService.set('_session_user', btoa(JSON.stringify(data)));
      setTimeout(() => {
        this.validation();
      }, 500);
    })
    .catch(e => {
      this.error = true;
    });
  }

  // obtenerUsuarios() {
  //   this.login.getUsuarios()
  //   .then( data => {
  //     if (data) {
  //       this.objUsuarios = data;
  //     } else {
  //       this.objUsuarios = [];
  //     }
  //   })
  //   .catch(e => this.objUsuarios = []);
  // }

}
