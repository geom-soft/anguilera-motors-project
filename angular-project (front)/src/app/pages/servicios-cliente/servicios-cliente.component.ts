import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { DatatableComponent } from '@swimlane/ngx-datatable';
import { ClientesService } from '../../services/clientes.service';
import { ViajesService } from '../../services/viajes.service';
import { RutasService } from '../../services/rutas.service';
import { ConductoresService } from '../../services/conductores.service';
import { LogServicioService } from '../../services/log-servicio.service';
import { AlertifyService } from 'src/app/services/alertify.service';
import { getParams } from 'src/app/helpers/params.helper';
declare var $: any;

interface Ruta {
  idreg?: number;
  idservicio?: number;
  nombre_solicitante: string;
  telefono_solicitante: string;
  numero_nomina: string;
  lugar_parada: string;
  domicilio_parada: string;
}

@Component({
  selector: 'app-servicios-cliente',
  templateUrl: './servicios-cliente.component.html',
  styleUrls: ['./servicios-cliente.component.css']
})
export class ServiciosClienteComponent implements OnInit {

  objSession: any;
  showError = false;

  objClientes = [];
  objPersonal = [];
  objConductores = [];
  objViajes: any = [];
  objOtros: any = [];

  s2_conductor: any;

  codigo_cliente = null;
  objCliente = null;

  objLogs = {
    arr: [],
    selected: '',
    admin: '',
    showNota: false
  };

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
  objViaje = null;
  objViajeClean = {
    idreg: null,
    codigo_cliente: '',
    codigo_conductor: '',
    fecha_servicio: '',
    distancia: '',
    fecha_inicio: null,
    fecha_termino: null,
    estatus: 'PENDIENTE'
  };

  objRutas: Ruta[] = [];
  objParada: Ruta;
  objParadaClean: Ruta = {
    idservicio: null,
    nombre_solicitante: '',
    telefono_solicitante: '',
    numero_nomina: '',
    lugar_parada: '',
    domicilio_parada: ''
  };

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private cliente: ClientesService,
    private conductores: ConductoresService,
    private servicios: ViajesService,
    private rutas: RutasService,
    private log: LogServicioService,
    private alertify: AlertifyService,
    private cookieService: CookieService
  ) {
    this.objSession = JSON.parse(atob(this.cookieService.get('_session_user')));
    getParams(this.route)
    .then( params => {
      if (params.code) {
        this.codigo_cliente = params.code;
        this.objViajeClean.codigo_cliente = this.codigo_cliente;
        this.cargarCliente(this.codigo_cliente);
      } else {
        this.router.navigate(['/lista-servicios']);
        return;
      }
    });
  }

  ngOnInit(): void {
    this.objSession = JSON.parse(atob(this.cookieService.get('_session_user')));
    this.cargarClientes();
    this.cargarConductores();
    this.cargarViajes(this.codigo_cliente);
    this.cargarOtros(this.codigo_cliente);
  }

  cargarClientes() {
    this.cliente.select2Clientes()
    .then(data => {
      this.objClientes = data;
    }).catch(e => this.objClientes = []);
  }

  valueChangeEmpresa(sel) {
    try {
      this.objViaje.codigo_cliente = sel.id;
    } catch (e) {
      this.objViaje.codigo_cliente = this.codigo_cliente;
    }
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
      this.objViaje.codigo_conductor = sel.id;
    } catch (e) {
      this.objViaje.codigo_conductor = '';
    }
  }

  cargarCliente(code) {
    this.cliente.getCliente(code)
    .then(data => {
      this.objCliente = data;
    }).catch(e => this.objCliente = null);
  }

  cargarViajes(code) {
    this.loading = true;
    this.servicios.getViajesCliente(code)
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

  buscarFilas(event) {
    const val = event.target.value.toLowerCase();
    const temp = this.temp.filter(function (d) {
      return d.nombre_empresa.toLowerCase().indexOf(val) !== -1 || d.nombre_solicitante.toLowerCase().indexOf(val) !== -1 || !val;
    });
    this.objViajes = temp;
    this.dtable.offset = 0;
  }

  cleanForm() {
    this.objViaje = JSON.parse(JSON.stringify(this.objViajeClean));
  }

  cargarViaje(id) {
    this.servicios.getViaje(id)
    .then(data => {
      this.objViaje = data;
      this.objViaje.fecha_servicio = data.fecha_servicio.replace(' ', 'T');
    }).catch(e => this.objViaje = null);
  }

  nuevoViaje() {
    this.nuevoRegistro = true;
    this.formulario.resetForm();
    setTimeout(() => {
      this.cleanForm();
    }, 300);
    $('#modal-servicio').modal('show');
  }

  editarViaje(code) {
    this.nuevoRegistro = false;
    this.cargarViaje(code);
    $('#modal-servicio').modal('show');
  }

  submitForm(form: NgForm) {
    if (!form.valid) {
      for (let i in form.controls) {
        form.controls[i].markAsTouched();
      }
      return;
    }
    form.controls.fecha_servicio.setValue(form.controls.fecha_servicio.value.replace('T', ' '));
    this.servicios.postViaje(form, this.nuevoRegistro)
    .then( (idserv) => {

      // LOG: servicio creado o actualizado
      this.log.postLog({
        idservicio: idserv,
        estatus: form.controls.estatus.value,
        codigo_usuario: this.objSession.codigo,
        tipo_usuario: 'ADMIN',
        notas: this.nuevoRegistro ? 'CREADO CORRECTAMENTE' : 'ACTUALIZADO CORRECTAMENTE'
      });

      // si el registro es nuevo, despues de guardar, da opcion a abrir las rutas y crea log de conductor
      if (this.nuevoRegistro) {
        // LOG: asignado a conductor
        setTimeout(() => {
          this.log.postLog({
            idservicio: idserv,
            estatus: form.controls.estatus.value,
            codigo_usuario: form.controls.codigo_conductor.value,
            tipo_usuario: 'CONDUCTOR',
            notas: 'SERVICIO ASIGNADO'
          });
        }, 200);

        this.alertify.createConfirm('Confirmación', '¿Desea definir la ruta del servicio en este momento?')
        .then(yes => {
          if (yes) {
            this.modalRutas(idserv);
          }
        }).catch(e => {});
      }
      setTimeout(() => {
        this.cargarViajes(this.codigo_cliente);
        this.cargarOtros(this.codigo_cliente);
        $('#modal-servicio').modal('hide');
      }, 1000);
    }).catch(e => console.error(e));
  }

  cancelaViaje(id) {
    this.servicios.cancelaViaje(id).then(() => {
      // LOG: servicio creado o actualizado
      this.log.postLog({
        idservicio: id,
        estatus: 'CANCELADO',
        codigo_usuario: this.objSession.codigo,
        tipo_usuario: 'ADMIN',
        notas: 'SERVICIO CANCELADO'
      });
      setTimeout(() => {
        this.cargarViajes(this.codigo_cliente);
        this.cargarOtros(this.codigo_cliente);
        $('#modal-servicio').modal('hide');
      }, 1000);
    }).catch(e => {});
  }

  cargarOtros(code) {
    this.servicios.getOtrosViajesCliente(code)
    .then( data => {
      this.objOtros = data;
      this.objOtros = [...this.objOtros]; // para el plugin de tablas
    })
    .catch(e => {
      this.objOtros = [...[]];
      console.log(e);
    });
  }

  cargaPersonalEmpresas(code) {
    this.cliente.getPersonal(code)
    .then(data => {
      this.objPersonal = data;
    }).catch(e => this.objPersonal = []);
  }

  valueChangePersonal(sel) {
    console.log('cambio');
    try {
      this.obtieneDatosPersonal(sel.item.id);
    } catch (e) {
      this.objParada.telefono_solicitante = '';
      this.objParada.numero_nomina = '';
    }
  }

  obtieneDatosPersonal(id) {
    this.cliente.getDatosPersona(id)
    .then(data => {
      this.objParada.telefono_solicitante = data.telefono_solicitante;
      this.objParada.numero_nomina = data.numero_nomina;
    }).catch(e => {
      this.objParada.telefono_solicitante = '';
      this.objParada.numero_nomina = '';
    });
  }

  modalRutas(idserv) {
    this.objParadaClean.idservicio = idserv;
    this.objParada = JSON.parse(JSON.stringify(this.objParadaClean));
    this.cargaPersonalEmpresas(this.codigo_cliente);
    $('#modal-rutas').modal('show');
    this.cargarRutas(idserv);
  }

  cargarRutas(idserv) {
    this.rutas.getRutas(idserv)
    .then(data => {
      this.objRutas = data;
    }).catch(e => this.objRutas = []);
  }

  submitParada(form: NgForm) {
    if (!form.valid) {
      for (let i in form.controls) {
        form.controls[i].markAsTouched();
      }
      return;
    }
    this.rutas.postRuta(form)
    .then(() => {
      const idserv = form.controls.idservicio.value;
      form.reset();
      setTimeout(() => {
        this.cargarRutas(idserv);
        this.objParadaClean.idservicio = idserv;
        this.objParada = JSON.parse(JSON.stringify(this.objParadaClean));
      }, 500);
    }).catch(e => console.log(e));
  }

  quitarParada(idreg, idserv) {
    this.rutas.deleteRuta(idreg)
    .then(() => {
      setTimeout(() => {
        this.cargarRutas(idserv);
      }, 500);
    }).catch(e => console.log(e));
  }

  servicioLogs(idserv, show) {
    this.objLogs.selected = idserv;
    this.objLogs.showNota = show;
    this.objLogs.admin = this.objSession.codigo;
    this.log.getLog(idserv)
    .then(data => {
      this.objLogs.arr = data;
    }).catch(e => this.objLogs.arr = []);
  }

  actualizaLog() {
    this.servicioLogs(this.objLogs.selected, true);
  }

  irPendientes() {
    this.router.navigate(['/lista-pendientes']);
  }

}
