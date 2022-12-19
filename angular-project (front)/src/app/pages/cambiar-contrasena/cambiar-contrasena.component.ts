import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { AdministradoresService } from 'src/app/services/administradores.service';

@Component({
  selector: 'app-cambiar-contrasena',
  templateUrl: './cambiar-contrasena.component.html',
  styleUrls: ['./cambiar-contrasena.component.css']
})
export class CambiarContrasenaComponent implements OnInit {

  objSession: any;
  objPerfil = {
    codigo_usuario: '',
    contrasena: ''
  };

  constructor(
    public router: Router,
    private cookieService: CookieService,
    private service: AdministradoresService
  ) { }

  ngOnInit(): void {
    this.objSession = JSON.parse(atob(this.cookieService.get('_session_user')));
    this.objPerfil.codigo_usuario = this.objSession.codigo;
  }

  submitForm() {
    this.service.postPerfil(this.objPerfil)
    .then( () => {
      setTimeout(() => {
        this.cookieService.delete('_session_user')
        this.router.navigate(['/login']);
      }, 500);
    })
    .catch(e => console.error(e));
  }

}
