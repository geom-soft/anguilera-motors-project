import { Component, OnInit, ViewChild } from '@angular/core';
import { DatatableComponent } from '@swimlane/ngx-datatable';
import { CookieService } from 'ngx-cookie-service';
import { ViajesService } from '../../services/viajes.service';
import { ConductoresService } from '../../services/conductores.service';
declare var $: any;

@Component({
  selector: 'app-servicios-pendientes',
  templateUrl: './servicios-pendientes.component.html',
  styleUrls: ['./servicios-pendientes.component.css']
})
export class ServiciosPendientesComponent implements OnInit {

  objSession: any;
  showError = false;

  codigo_cliente = null;
  objViajes: any = [];

  objConductores = [];
  s2_conductor: any;
  objAsigna = {
    idservicio: '',
    conductor: ''
  };

  @ViewChild('dtable') dtable: DatatableComponent;
  loading = true;
  temp = [];
  msgTraduccion = {
    emptyMessage: 'Sin registros por mostrar',
    totalMessage: 'registros.',
    selectedMessage: 'seleccionado'
  };

  constructor(
    private cookieService: CookieService,
    private conductores: ConductoresService,
    private servicios: ViajesService
  ) {
    this.objSession = JSON.parse(atob(this.cookieService.get('_session_user')));
    this.codigo_cliente = this.objSession.codigo;
  }

  ngOnInit(): void {
    this.cargarConductores();
    this.cargarViajes();
  }

  cargarViajes() {
    this.loading = true;
    this.servicios.getViajesNoAsignados()
    .then( data => {
      this.showError = false;
      this.objViajes = data;
      this.loading = false;
      this.objViajes = [...this.objViajes]; // para el plugin de tablas
      this.temp = [...this.objViajes];  // para el plugin de tablas
    })
    .catch(e => {
      this.showError = true;
      this.objViajes = [...[]];
      this.loading = false;
      console.log(e);
    });
  }

  modalEditar(code) {
    this.objAsigna.idservicio = code;
    $('#modal-asignar').modal('show');
  }

  editarViaje() {
    if (!this.objAsigna.idservicio || !this.objAsigna.conductor) {
      return;
    }
    this.servicios.postAsignar(this.objAsigna)
    .then(() => {
      setTimeout(() => {
        this.cargarViajes();
        $('#modal-asignar').modal('hide');
      }, 500);
    }).catch(e => console.log(e));
  }

  eliminarViaje(code) {
    this.servicios.eliminarViaje(code)
    .then(() => {
      setTimeout(() => {
        this.cargarViajes();
      }, 500);
    }).catch(e => console.log(e));
  }

  cargarConductores() {
    this.conductores.select2Conductores()
    .then(data => {
      this.objConductores = data;
      this.s2_conductor = {
        options: {
          language: 'es',
          placeholder: 'Asignar el servicio a un conductor',
          allowClear: true
        },
        data: [
          {
            id: '',
            text: 'Conductor no asignado'
          },
          {
            children: this.objConductores
          }
        ]
      };
    }).catch(e => this.objConductores = []);
  }

  valueChangeConductor(sel) {
    try {
      this.objAsigna.conductor = sel.id;
    } catch (e) {
      this.objAsigna.conductor = '';
    }
  }

}
