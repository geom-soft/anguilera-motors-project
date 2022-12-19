import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';
import { ConductoresService } from '../../services/conductores.service';
import { AlertifyService } from '../../services/alertify.service';
import { DatatableComponent } from '@swimlane/ngx-datatable';
declare var $: any;

@Component({
  selector: 'app-lista-conductores',
  templateUrl: './lista-conductores.component.html',
  styleUrls: ['./lista-conductores.component.css']
})
export class ListaConductoresComponent implements OnInit {

  objSession: any;
  showError = false;
  objConductores: any = [];

  @ViewChild('dtable') dtable: DatatableComponent;
  loading = true;
  temp = [];
  msgTraduccion = {
    emptyMessage: 'Sin registros por mostrar',
    totalMessage: 'registros.',
    selectedMessage: 'seleccionado'
  };

  @ViewChild('form') formulario: NgForm;
  nuevoRegistro = true;
  objConductor = null;
  objConductorClean = {
    codigo_conductor: null,
    nombres: '',
    apellidos: '',
    telefono: '',
    correo_electronico: '',
    descripcion_vehiculo: '',
    fecha_licencia: '',
    fecha_movilidad: '',
    fecha_poliza: '',
    placas_vehiculo: '',
    contrasena: '',
    estatus: '1'
  };

  constructor(
    private service: ConductoresService,
    private cookieService: CookieService,
    private alertify: AlertifyService
  ) {
    this.objSession = JSON.parse(atob(this.cookieService.get('_session_user')));
  }

  ngOnInit(): void {
    this.cargarConductores();
  }

  cargarConductores() {
    this.loading = true;
    this.service.getConductores()
    .then( data => {
      this.showError = false;
      this.objConductores = data;
      this.loading = false;
      this.objConductores = [...this.objConductores]; // para el plugin de tablas
      this.temp = [...this.objConductores];  // para el plugin de tablas
    })
    .catch(e => {
      this.showError = true;
      this.objConductores = [...[]];
      this.loading = false;
      console.log(e);
    });
  }

  buscarFilas(event) {
    const val = event.target.value.toLowerCase();
    const temp = this.temp.filter(function (d) {
      return d.nombres.toLowerCase().indexOf(val) !== -1 || d.apellidos.toLowerCase().indexOf(val) !== -1 || !val;
    });
    this.objConductores = temp;
    this.dtable.offset = 0;
  }

  eliminarConductor(code) {
    this.service.deleteConductor(code)
    .then( () => {
      this.cargarConductores();
    }).catch( e => {});
  }

  cleanForm() {
    this.objConductor = JSON.parse(JSON.stringify(this.objConductorClean));
  }

  cargarConductor(code) {
    this.service.getConductor(code)
    .then(data => {
      this.objConductor = data;
    }).catch(e => this.objConductor = null);
  }

  nuevoConductor() {
    this.nuevoRegistro = true;
    this.formulario.reset();
    this.cleanForm();
    $('#modal-conductor').modal('show');
  }

  editarConductor(code) {
    this.nuevoRegistro = false;
    this.cargarConductor(code);
    $('#modal-conductor').modal('show');
  }

  submitForm(form: NgForm) {
    if (!form.valid) {
      for (let i in form.controls) {
        form.controls[i].markAsTouched();
      }
      return;
    }
    this.service.postConductor(form, this.nuevoRegistro)
    .then( () => {
      setTimeout(() => {
        this.cargarConductores();
        $('#modal-conductor').modal('hide');
      }, 1000);
    })
    .catch(e => console.error(e));
  }

  resetPass() {
    this.service.resetNIP(this.objConductor.codigo_conductor)
    .then( () => {
      $('#modal-conductor').modal('hide');
      this.alertify.createAlert('¡NIP restaurado correctamente!', 'Notifique al conductor su nuevo NIP para que pueda acceder a su perfil y realizar un cambio a la brevedad posible. <br>Nuevo NIP: 1234');
      this.cargarConductor(this.objConductor.codigo_conductor);
    }).catch( e => {});
  }

}
