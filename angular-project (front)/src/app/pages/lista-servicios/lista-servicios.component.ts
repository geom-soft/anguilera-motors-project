import { Component, OnInit, ViewChild, OnDestroy, ElementRef } from '@angular/core';
import { NgForm } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';
import { ViajesService } from '../../services/viajes.service';
import { ConductoresService } from '../../services/conductores.service';
import { DatatableComponent } from '@swimlane/ngx-datatable';
// import { LogServicioService } from '../../services/log-servicio.service';
import { ClientesService } from '../../services/clientes.service';
import { UploadService } from '../../services/upload.service';
declare var $: any;

@Component({
  selector: 'app-lista-servicios',
  templateUrl: './lista-servicios.component.html',
  styleUrls: ['./lista-servicios.component.css']
})
export class ListaServiciosComponent implements OnInit, OnDestroy {

  objSession: any;
  showError = false;

  segundos = 180;
  intervalo = null;

  objClientes = [];
  objConductores = [];
  objViajes: any = [];
  objOtros: any = [];

  clienteSelected = 'TODOS';
  estatusSelected = 'TODOS';

  objLogs = {
    arr: [],
    selected: '',
    admin: '',
    showNota: false
  };

  idsSelected = '';
  idcSelected = '';


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

  @ViewChild('inputFile', { static: false }) inputFile: ElementRef;
  clienteImport = '';

  @ViewChild('dtable') dtable: DatatableComponent;
  loading = true;
  temp = [];
  msgTraduccion = {
    emptyMessage: 'Sin registros por mostrar',
    totalMessage: 'registros.',
    selectedMessage: 'seleccionado'
  };

  constructor(
    private service: ViajesService,
    private cookieService: CookieService,
    private conductores: ConductoresService,
    private clientes: ClientesService,
    private upload: UploadService,
    // private log: LogServicioService
  ) {
    this.objSession = JSON.parse(atob(this.cookieService.get('_session_user')));
  }

  ngOnInit(): void {
    this.cargarClientes();
    this.cargarConductores();
    this.cargarViajes();
    // this.cargarOtros();
    this.initClock();
  }

  ngOnDestroy() {
    // se detiene el contador
    clearInterval(this.intervalo);
  }

  initClock() {
    this.intervalo = setInterval(() => {
      if (this.segundos === 0) {
        // se reinicia contador y se actualizan los registros
        this.segundos = 180;
        // this.cargarClientes();
        this.cargarConductores();
        this.cargarViajes();
        // this.cargarOtros();
      } else {
        this.segundos--;
      }
    }, 1000);
  }

  cargarConductores() {
    this.conductores.getConductores()
    .then(data => {
      this.objConductores = data;
    }).catch(e => this.objConductores = []);
  }

  cargarClientes() {
    this.clientes.getClientes()
    .then(data => {
      this.objClientes = data;
    }).catch(e => this.objClientes = []);
  }

  cargarViajes() {
    this.loading = true;
    this.service.getViajesFiltro(this.clienteSelected, this.estatusSelected)
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

  // cargarOtros() {
  //   this.service.getOtrosViajes()
  //   .then( data => {
  //     this.objOtros = data;
  //     this.objOtros = [...this.objOtros]; // para el plugin de tablas
  //   })
  //   .catch(e => {
  //     this.objOtros = [...[]];
  //     console.log(e);
  //   });
  // }

  // servicioLogs(idserv, show) {
  //   this.objLogs.selected = idserv;
  //   this.objLogs.showNota = show;
  //   this.objLogs.admin = this.objSession.codigo;
  //   this.log.getLog(idserv)
  //   .then(data => {
  //     this.objLogs.arr = data;
  //   }).catch(e => this.objLogs.arr = []);
  // }

  // actualizaLog() {
  //   this.servicioLogs(this.objLogs.selected, true);
  // }

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

  editarServicio(id) {
    this.cleanForm();
    this.nuevoRegistro = false;
    this.cargarServicio(id);
    $('#modal-servicio').modal('show');
  }

  eliminarServicio(id) {
    this.service.eliminarViaje(id)
    .then(() => {
      setTimeout(() => {
        this.cargarViajes();
      }, 500);
    }).catch(e => console.log(e));
  }

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
        this.cargarViajes();
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

  modalConductor(id) {
    this.idsSelected = id;
    $('#modal-conductor').modal('show');
  }

  asignarConductor() {
    const obj = {idservicio: this.idsSelected, conductor: this.idcSelected};
    this.service.postAsignar(obj)
    .then(() => {
      $('#modal-conductor').modal('hide');
      setTimeout(() => {
        this.cargarViajes();
      }, 500);
    }).catch(e => console.log(e));
  }




  importar(form: NgForm) {
    const fileList: FileList = this.inputFile.nativeElement.files;
    if (fileList.length > 0) {
      this.upload.uploadFileServicios( fileList[0], this.clienteImport )
      .then( (data: string) => {
        // console.log('total', data);
        this.clienteImport = '';
        $('#modal-importar-servicio').modal('hide');
        this.inputFile.nativeElement.value = ''; // reset input
        setTimeout(() => {
          this.cargarViajes();
        }, 500);
      }, error => {
        // console.log(error);
      });
    }
  }

}
