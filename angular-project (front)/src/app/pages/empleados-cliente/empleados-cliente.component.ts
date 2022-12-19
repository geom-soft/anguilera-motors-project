import { Component, OnInit, ViewChild, AfterViewInit, ElementRef } from '@angular/core';
import { Map, tileLayer, latLng, Marker } from 'leaflet';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { DatatableComponent } from '@swimlane/ngx-datatable';
import { ClientesService } from '../../services/clientes.service';
import { getParams } from 'src/app/helpers/params.helper';
import { UploadService } from '../../services/upload.service';
import * as L from 'leaflet';
declare var $: any;

@Component({
  selector: 'app-empleados-cliente',
  templateUrl: './empleados-cliente.component.html',
  styleUrls: ['./empleados-cliente.component.css']
})
export class EmpleadosClienteComponent implements OnInit, AfterViewInit {

  objSession: any;
  showError = false;

  codigo_cliente = null;
  objCliente = null;
  objPersonal = [];

  objEmpleado = null;
  objEmpleadoClean = {
    idreg: '',
    nombre_solicitante: '',
    telefono_solicitante: '',
    numero_nomina: '',
    latitud: '',
    longitud: '',
    ubicacion: '',
    alias_lugar: '',
    domicilio: '',
    codigo_cliente: ''
  };


  map: Map;

  myMarker: Marker;

  mapInit = {
    lat: 21.8805389,
    lng: -102.2958653,
    zoom: 12
  };
  mapValues = {
    lat: 21.8805389,
    lng: -102.2958653,
    zoom: 12
  };

  mapOptions = {
    layers: [
      tileLayer('http://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}', { maxZoom: 18, subdomains:['mt0','mt1','mt2','mt3'] })
    ],
    attributionControl: false,
    zoom: this.mapInit.zoom,
    center: latLng(this.mapInit.lat, this.mapInit.lng)
  };

  objClientes = [];
  @ViewChild('inputFile', { static: false }) inputFile: ElementRef;



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

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private cliente: ClientesService,
    private upload: UploadService,
    private cookieService: CookieService
  ) {
    this.objSession = JSON.parse(atob(this.cookieService.get('_session_user')));
    getParams(this.route)
    .then( params => {
      if (params.code) {
        this.codigo_cliente = params.code;
        this.objEmpleadoClean.codigo_cliente = this.codigo_cliente;
        this.cargarCliente(this.codigo_cliente);
      } else {
        this.router.navigate(['/lista-clientes']);
        return;
      }
    });
  }

  ngOnInit(): void {
    this.objSession = JSON.parse(atob(this.cookieService.get('_session_user')));
    this.cargarClientes();
    this.cargarEmpleados(this.codigo_cliente);
  }

  ngAfterViewInit(){
    // map.invalidateSize(true);
  }

  fixMap() {
    setTimeout(() => {
      this.map.invalidateSize();
    }, 1000);
  }

  onMapReady(map: Map) {
    this.map = map;
  }

  cargarClientes() {
    this.cliente.getClientes()
    .then(data => {
      this.objClientes = data;
    }).catch(e => this.objClientes = []);
  }

  cargarCliente(code) {
    this.cliente.getCliente(code)
    .then(data => {
      this.objCliente = data;
    }).catch(e => this.objCliente = null);
  }

  cargarEmpleados(code) {
    this.loading = true;
    this.cliente.getPersonal(code)
    .then( data => {
      this.showError = false;
      this.objPersonal = data;
      this.loading = false;
      this.objPersonal = [...this.objPersonal]; // para el plugin de tablas
      this.temp = [...this.objPersonal];  // para el plugin de tablas
    })
    .catch(e => {
      this.showError = true;
      this.objPersonal = [...[]];
      this.loading = false;
      console.log(e);
    });
  }

  buscarFilas(event) {
    const val = event.target.value.toLowerCase();
    const temp = this.temp.filter(function (d) {
      return d.nombre_solicitante.toLowerCase().indexOf(val) !== -1 || d.numero_nomina.toLowerCase().indexOf(val) !== -1 || !val;
    });
    this.objPersonal = temp;
    this.dtable.offset = 0;
  }

  cleanForm() {
    this.objEmpleado = JSON.parse(JSON.stringify(this.objEmpleadoClean));
  }

  cargarEmpleado(id) {
    this.cliente.getDatosPersona(id)
    .then(data => {
      this.objEmpleado = data;
      if (this.objEmpleado.latitud && this.objEmpleado.longitud) {
        this.objEmpleado.latitud = Number(this.objEmpleado.latitud);
        this.objEmpleado.longitud = Number(this.objEmpleado.longitud);
        try {
          this.map.removeLayer(this.myMarker);
        } catch (e) {}
        this.myMarker = null;
        this.myMarker = L.marker([this.objEmpleado.latitud, this.objEmpleado.longitud]).addTo(this.map);
        setTimeout(() => {
          this.objEmpleado.ubicacion = this.objEmpleado.latitud + ',' + this.objEmpleado.longitud;
          this.mapValues.lat = this.objEmpleado.latitud;
          this.mapValues.lng = this.objEmpleado.longitud;
          this.mapValues.zoom = 16;
        }, 500);
      } else {
        this.resetMap();
      }
    }).catch(e => this.objEmpleado = null);
  }

  nuevoEmpleado() {
    this.nuevoRegistro = true;
    this.formulario.resetForm();
    setTimeout(() => {
      this.resetMap();
      this.cleanForm();
    }, 500);
    $('#modal-empleado').modal('show');
  }

  editarEmpleado(code) {
    this.nuevoRegistro = false;
    this.cargarEmpleado(code);
    $('#modal-empleado').modal('show');
  }

  borrarEmpleado(code) {
    this.cliente.deleteEmpleado(code)
    .then(() => {
      setTimeout(() => {
        this.cargarEmpleados(this.codigo_cliente);
      }, 500);
    }).catch(e => console.log(e));
  }

  submitForm(form: NgForm) {
    if (!form.valid) {
      for (let i in form.controls) {
        form.controls[i].markAsTouched();
      }
      return;
    }
    this.cliente.postEmpleado(form, this.nuevoRegistro)
    .then(() => {
      form.reset();
      setTimeout(() => {
        this.cargarEmpleados(this.codigo_cliente);
        $('#modal-empleado').modal('hide');
      }, 500);
    }).catch(e => console.log(e));
  }



  resetMap() {
    try {
      this.map.removeLayer(this.myMarker);
    } catch (e) {}
    this.myMarker = null;
    this.mapValues.lat = this.mapInit.lat;
    this.mapValues.lng = this.mapInit.lng;
    this.mapValues.zoom = this.mapInit.zoom;
  }

  mapClick(e: any) {
    try {
      this.map.removeLayer(this.myMarker);
    } catch (e) {}
    this.myMarker = null;
    this.myMarker = L.marker([e.latlng.lat, e.latlng.lng]).addTo(this.map);
    this.objEmpleado.latitud = e.latlng.lat;
    this.objEmpleado.longitud = e.latlng.lng;
  }

  saveCoords() {
    this.objEmpleado.ubicacion = this.objEmpleado.latitud + ',' + this.objEmpleado.longitud;
    $('#modal-ubicacion').modal('hide');
  }


  importar(form: NgForm) {
    const fileList: FileList = this.inputFile.nativeElement.files;
    if (fileList.length > 0) {
      this.upload.uploadFileEmpleados( fileList[0], this.codigo_cliente )
      .then( (data: string) => {
        // console.log('total', data);
        $('#modal-importar-empleado').modal('hide');
        this.inputFile.nativeElement.value = ''; // reset input
        setTimeout(() => {
          this.cargarEmpleados(this.codigo_cliente);
        }, 500);
      }, error => {
        // console.log(error);
      });
    }
  }

}
