import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { DatatableComponent } from '@swimlane/ngx-datatable';
import { CookieService } from 'ngx-cookie-service';
import { ViajesService } from '../../services/viajes.service';
// import { RutasService } from '../../services/rutas.service';
// import { LogServicioService } from '../../services/log-servicio.service';
// import { AlertifyService } from 'src/app/services/alertify.service';
import { ClientesService } from '../../services/clientes.service';
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
  selector: 'app-mis-servicios',
  templateUrl: './mis-servicios.component.html',
  styleUrls: ['./mis-servicios.component.css']
})
export class MisServiciosComponent implements OnInit {

  objSession: any;
  showError = false;

  codigo_cliente = null;
  objViajes: any = [];

  @ViewChild('dtable') dtable: DatatableComponent;
  loading = true;
  temp = [];
  msgTraduccion = {
    emptyMessage: 'Sin registros por mostrar',
    totalMessage: 'registros.',
    selectedMessage: 'seleccionado'
  };

  objServicio = null;
  objServicioClean = {
    idreg: '',
    codigo_cliente: '',
    fecha_servicio: '',
    hora_entrada: '',
    hora_salida: '',
    nombre_ruta: ''
  };

  arrParadas = [];
  objParada = null;
  objParadaClean = {
    idservicio: '',
    idnomina: '',
    tipo_parada: '',
    hora_recoleccion: ''
  };

  @ViewChild('form') formulario: NgForm;
  nuevoRegistro = true;
  

  constructor(
    private cookieService: CookieService,
    private service: ViajesService,
    // private log: LogServicioService,
    private clientes: ClientesService
  ) {
    this.objSession = JSON.parse(atob(this.cookieService.get('_session_user')));
    this.codigo_cliente = this.objSession.codigo;
    this.objServicioClean.codigo_cliente = this.codigo_cliente;
  }

  ngOnInit(): void {
    this.objServicioClean.codigo_cliente = this.codigo_cliente;
    this.cargarViajes(this.codigo_cliente);
  }

  cargarViajes(code) {
    this.loading = true;
    this.service.getViajesCliente(code)
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

  cleanForm() {
    this.objServicio = JSON.parse(JSON.stringify(this.objServicioClean));
    this.objParada = JSON.parse(JSON.stringify(this.objParadaClean));
    this.arrParadas = [];
  }

  cleanParadas() {
    this.arrParadas = [];
  }

  async cargarServicio(id) {
    this.objServicio = await this.service.getViaje(id);
    this.arrParadas = JSON.parse(this.objServicio.paradas);
    // console.log(this.objServicio);
  }

  nuevoServicio() {
    this.nuevoRegistro = true;
    this.formulario.resetForm();
    setTimeout(() => {
      this.cleanForm();
    }, 500);
    $('#modal-servicio').modal('show');
  }

  // editarServicio(id) {
  //   this.cleanForm();
  //   this.nuevoRegistro = false;
  //   this.cargarServicio(id);
  //   $('#modal-servicio').modal('show');
  // }

  // eliminarServicio(id) {
  //   this.service.eliminarViaje(id)
  //   .then(() => {
  //     setTimeout(() => {
  //       this.cargarViajes();
  //     }, 500);
  //   }).catch(e => console.log(e));
  // }

  submitForm(form) {

    this.objServicio.paradas = JSON.stringify(this.arrParadas);

    if (!form.valid) {
      for (let i in form.controls) {
        form.controls[i].markAsTouched();
      }
      return;
    }
    this.service.postViaje(this.objServicio, this.nuevoRegistro)
    .then(() => {
      form.reset();
      setTimeout(() => {
        this.cleanForm();
        this.cargarViajes(this.codigo_cliente);
        $('#modal-servicio').modal('hide');
      }, 500);
    }).catch(e => console.log(e));
  }



  agregarParada() {
    this.clientes.getDatosPersonaNomina(this.objServicio.codigo_cliente, this.objParada.idnomina)
    .then(data => {
      if (data) {
        const obj = {
          idnomina: this.objParada.idnomina,
          nombre_solicitante: data.nombre_solicitante,
          alias_lugar: data.alias_lugar,
          tipo_parada: this.objParada.tipo_parada,
          hora_recoleccion_entrada: this.objParada.hora_recoleccion,
          hora_recoleccion_salida: (this.objParada.tipo_parada !== 'ENTRADA') ? this.objServicio.hora_salida : null
        };
        this.arrParadas.push(obj);
        this.objParada = JSON.parse(JSON.stringify(this.objParadaClean));
      } else {
        // error o mensaje de empleado no encontrado
      }
    }).catch(e => {
       // error o mensaje de empleado no encontrado
      console.log(e);
    });
  }

  quitarParada(ix) {
    this.arrParadas.splice(ix, 1);
  }

  // cancelaViaje(id) {
  //   this.servicios.cancelaViaje(id).then(() => {
  //     // LOG: servicio creado o actualizado
  //     this.log.postLog({
  //       idservicio: id,
  //       estatus: 'CANCELADO',
  //       codigo_usuario: this.objSession.codigo,
  //       tipo_usuario: 'CLIENTE',
  //       notas: 'SERVICIO CANCELADO'
  //     });
  //     setTimeout(() => {
  //       this.cargarViajes(this.codigo_cliente);
  //       $('#modal-servicio').modal('hide');
  //     }, 1000);
  //   }).catch(e => {});
  // }

}
