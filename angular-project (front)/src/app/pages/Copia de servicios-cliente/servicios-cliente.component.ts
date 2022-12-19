import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { ClientesService } from '../../services/clientes.service';
import { ViajesService } from '../../services/viajes.service';
import { ConductoresService } from '../../services/conductores.service';
import { DatatableComponent } from '@swimlane/ngx-datatable';
import { getParams } from 'src/app/helpers/params.helper';
declare var $: any;

interface Ruta {
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
  s2_empresa: any;

  paradasOpt = 'SIN';
  viajeOpt = 'IDA';

  codigo_cliente = null;
  objCliente = null;

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
    notas: '',
    estatus: 'PENDIENTE'
  };

  objRutas: Ruta[] = [];
  objOrigen: Ruta;
  objDestino: Ruta;
  objRutaClean: Ruta = {
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
    private cookieService: CookieService
  ) {
    this.objOrigen = JSON.parse(JSON.stringify(this.objRutaClean));
    this.objDestino = JSON.parse(JSON.stringify(this.objRutaClean));
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
    this.cargarClientes();
    this.cargarConductores();
    this.cargarViajes(this.codigo_cliente);
    this.cargarOtros(this.codigo_cliente);
  }

  cargarClientes() {
    this.cliente.select2Clientes()
    .then(data => {
      this.objClientes = data;
      this.s2_empresa = {
        options: {
          language: 'es',
          placeholder: 'Seleccionar...',
          allowClear: true
        },
        data: [
          {
            id: '',
            text: 'Cliente no seleccionado'
          },
          {
            children: this.objClientes
          }
        ]
      };
    }).catch(e => this.objClientes = []);
  }

  valueChangeEmpresa(sel) {
    try {
      this.cargaPersonalEmpresas(sel.id);
    } catch (e) {}
  }

  cargaPersonalEmpresas(code) {
    this.cliente.getPersonal(code)
    .then(data => {
      this.objPersonal = data;
    }).catch(e => this.objPersonal = []);
  }

  valueChangePersonal(sel) {
    try {
      console.log(sel.item.id);
    } catch (e) {}
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
      console.log(sel);
    } catch (e) {}
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
    }).catch(e => this.objViaje = null);
  }

  nuevoViaje() {
    this.nuevoRegistro = true;
    this.formulario.reset();
    this.cleanForm();
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
    this.servicios.postViaje(form, this.nuevoRegistro)
    .then( () => {
      setTimeout(() => {
        this.cargarViajes(this.codigo_cliente);
        this.cargarOtros(this.codigo_cliente);
        $('#modal-servicio').modal('hide');
      }, 1000);
    })
    .catch(e => console.error(e));
  }

  cancelaViaje(id) {
    this.servicios.cancelaViaje(id).then(() => {
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

  agregarParada() {
    this.objRutas.push({
      nombre_solicitante: '',
      telefono_solicitante: '',
      numero_nomina: '',
      lugar_parada: '',
      domicilio_parada: ''
    });
  }

  quitarParada(index) {
    this.objRutas.splice(index, 1);
  }

}
