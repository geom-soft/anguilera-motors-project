import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';
import { ClientesService } from '../../services/clientes.service';
import { AlertifyService } from '../../services/alertify.service';
import { DatatableComponent } from '@swimlane/ngx-datatable';
declare var $: any;

@Component({
  selector: 'app-lista-clientes',
  templateUrl: './lista-clientes.component.html',
  styleUrls: ['./lista-clientes.component.css']
})
export class ListaClientesComponent implements OnInit {

  objSession: any;
  showError = false;
  objClientes: any = [];

  @ViewChild('dtable') dtable: DatatableComponent;
  loading = true;
  temp = [];
  msgTraduccion = {
    emptyMessage: 'Sin registros por mostrar',
    totalMessage: 'registros.',
    selectedMessage: 'seleccionado'
  };
  // columns = [
  //   { name: '#', prop: 'index' },
  //   { name: 'Empresa', prop: 'nombre_empresa' },
  //   { name: 'Titular', prop: 'nombre_titular' },
  //   { name: 'Teléfono', prop: 'telefono' }
  // ];

  @ViewChild('form') formulario: NgForm;
  nuevoRegistro = true;
  objCliente = null;
  objClienteClean = {
    codigo_cliente: null,
    nombre_empresa: '',
    nombre_titular: '',
    telefono: '',
    domicilio: '',
    usuario_acceso: '',
    contrasena: '1234'
  };

  constructor(
    private service: ClientesService,
    private cookieService: CookieService,
    private alertify: AlertifyService
  ) {
    this.objSession = JSON.parse(atob(this.cookieService.get('_session_user')));
  }

  ngOnInit(): void {
    this.cargarClientes();
  }

  // getRowIndex(row) {
  //   return this.dtable.bodyComponent.getRowIndex(row);
  // }

  cargarClientes() {
    this.loading = true;
    this.service.getClientes()
    .then( data => {
      this.showError = false;
      this.objClientes = data;
      this.objClientes = [...this.objClientes]; // para el plugin de tablas
      this.temp = [...this.objClientes];  // para el plugin de tablas
      this.loading = false;
    })
    .catch(e => {
      this.showError = true;
      this.objClientes = [...[]];
      this.loading = false;
      console.log(e);
    });
  }

  buscarFilas(event) {
    const val = event.target.value.toLowerCase();
    const temp = this.temp.filter(function (d) {
      return d.nombre_empresa.toLowerCase().indexOf(val) !== -1 || d.nombre_titular.toLowerCase().indexOf(val) !== -1 || !val;
    });
    this.objClientes = temp;
    this.dtable.offset = 0;
  }

  eliminarCliente(code) {
    this.service.deleteCliente(code)
    .then( () => {
      this.cargarClientes();
    }).catch( e => {});
  }

  cleanForm() {
    this.objCliente = JSON.parse(JSON.stringify(this.objClienteClean));
  }

  cargarCliente(code) {
    this.service.getCliente(code)
    .then(data => {
      this.objCliente = data;
    }).catch(e => this.objCliente = null);
  }

  nuevoCliente() {
    this.nuevoRegistro = true;
    this.formulario.reset();
    this.cleanForm();
    $('#modal-cliente').modal('show');
  }

  editarCliente(code) {
    this.nuevoRegistro = false;
    this.cargarCliente(code);
    $('#modal-cliente').modal('show');
  }

  submitForm(form: NgForm) {
    if (!form.valid) {
      for (let i in form.controls) {
        form.controls[i].markAsTouched();
      }
      return;
    }
    this.service.postCliente(form, this.nuevoRegistro)
    .then( () => {
      setTimeout(() => {
        this.cargarClientes();
        $('#modal-cliente').modal('hide');
      }, 1000);
    })
    .catch(e => console.error(e));
  }

  resetPass() {
    this.service.resetNIP(this.objCliente.codigo_cliente)
    .then( () => {
      $('#modal-cliente').modal('hide');
      this.alertify.createAlert('¡NIP restaurado correctamente!', 'Notifique al cliente su nuevo NIP para que pueda acceder a su perfil y realizar un cambio a la brevedad posible. <br>Nuevo NIP: 1234');
      this.cargarCliente(this.objCliente.codigo_cliente);
    }).catch( e => {});
  }

}
