import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';
import { AdministradoresService } from '../../services/administradores.service';
import { AlertifyService } from '../../services/alertify.service';
import { DatatableComponent } from '@swimlane/ngx-datatable';
declare var $: any;

@Component({
  selector: 'app-lista-usuarios',
  templateUrl: './lista-usuarios.component.html',
  styleUrls: ['./lista-usuarios.component.css']
})
export class ListaUsuariosComponent implements OnInit {

  objSession: any;
  showError = false;
  objUsuarios: any = [];

  @ViewChild('dtable') dtable: DatatableComponent;
  loading = true;
  temp = [];
  msgTraduccion = {
    emptyMessage: 'Sin registros por mostrar',
    totalMessage: 'registro(s).',
    selectedMessage: 'seleccionado'
  };

  @ViewChild('form') formulario: NgForm;
  nuevoRegistro = true;
  objUsuario = null;
  objUsuarioClean = {
    codigo_usuario: null,
    nombres: '',
    apellidos: '',
    correo_electronico: '',
    contrasena: '',
    estatus: '1'
  };

  constructor(
    private service: AdministradoresService,
    private cookieService: CookieService,
    private alertify: AlertifyService
  ) {
    this.objSession = JSON.parse(atob(this.cookieService.get('_session_user')));
  }

  ngOnInit(): void {
    this.cargarUsuarios();
  }

  cargarUsuarios() {
    this.loading = true;
    this.service.getUsuarios()
    .then( data => {
      this.showError = false;
      this.objUsuarios = data;
      this.objUsuarios = [...this.objUsuarios]; // para el plugin de tablas
      this.temp = [...this.objUsuarios];  // para el plugin de tablas
      this.loading = false;
    })
    .catch(e => {
      this.showError = true;
      this.objUsuarios = [...[]];
      this.loading = false;
      console.log(e);
    });
  }

  buscarFilas(event) {
    const val = event.target.value.toLowerCase();
    const temp = this.temp.filter(function (d) {
      return d.nombres.toLowerCase().indexOf(val) !== -1 || d.apellidos.toLowerCase().indexOf(val) !== -1 || !val;
    });
    this.objUsuarios = temp;
    this.dtable.offset = 0;
  }

  eliminarUsuario(code) {
    this.service.deleteUsuario(code)
    .then( () => {
      this.cargarUsuarios();
    }).catch( e => {});
  }

  cleanForm() {
    this.objUsuario = JSON.parse(JSON.stringify(this.objUsuarioClean));
  }

  cargarUsuario(code) {
    this.service.getUsuario(code)
    .then(data => {
      this.objUsuario = data;
    }).catch(e => this.objUsuario = null);
  }

  nuevoUsuario() {
    this.nuevoRegistro = true;
    this.formulario.reset();
    this.cleanForm();
    $('#modal-usuario').modal('show');
  }

  editarUsuario(code) {
    this.nuevoRegistro = false;
    this.cargarUsuario(code);
    $('#modal-usuario').modal('show');
  }

  submitForm(form: NgForm) {
    if (!form.valid) {
      for (let i in form.controls) {
        form.controls[i].markAsTouched();
      }
      return;
    }
    this.service.postUsuario(form, this.nuevoRegistro)
    .then( () => {
      setTimeout(() => {
        this.cargarUsuarios();
        $('#modal-usuario').modal('hide');
      }, 1000);
    })
    .catch(e => console.error(e));
  }

  resetPass() {
    this.service.resetNIP(this.objUsuario.codigo_usuario)
    .then( () => {
      $('#modal-usuario').modal('hide');
      this.alertify.createAlert('¡NIP restaurado correctamente!', 'Notifique al usuario su nuevo NIP para que pueda acceder a su perfil y realizar un cambio a la brevedad posible. <br>Nuevo NIP: 1234');
      this.cargarUsuario(this.objUsuario.codigo_usuario);
    }).catch( e => {});
  }

}
