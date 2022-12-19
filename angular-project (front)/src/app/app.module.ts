import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { LSelect2Module } from 'ngx-select2';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { TypeaheadModule } from 'ngx-bootstrap/typeahead';
import { CookieService } from 'ngx-cookie-service';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';

import { PagesComponent } from './pages/pages.component';
import { LoginComponent } from './pages/login/login.component';
import { InicioComponent } from './pages/inicio/inicio.component';
import { NavbarComponent } from './htmlComponents/navbar/navbar.component';
import { SidebarComponent } from './htmlComponents/sidebar/sidebar.component';
import { FooterComponent } from './htmlComponents/footer/footer.component';
import { ListaUsuariosComponent } from './pages/lista-usuarios/lista-usuarios.component';
import { ListaClientesComponent } from './pages/lista-clientes/lista-clientes.component';
import { ListaConductoresComponent } from './pages/lista-conductores/lista-conductores.component';
import { ListaServiciosComponent } from './pages/lista-servicios/lista-servicios.component';
import { EstatusActivoPipe } from './pipes/estatus-activo.pipe';
import { CambiarContrasenaComponent } from './pages/cambiar-contrasena/cambiar-contrasena.component';
import { MomentPipe } from './pipes/moment.pipe';
import { EstatusServicioPipe } from './pipes/estatus-servicio.pipe';
import { ServiciosClienteComponent } from './pages/servicios-cliente/servicios-cliente.component';
import { ClockPipe } from './pipes/clock.pipe';
import { DatePickerComponent } from './customComponents/date-picker/date-picker.component';
import { LogsModalComponent } from './customComponents/logs-modal/logs-modal.component';
import { MisServiciosComponent } from './pages/mis-servicios/mis-servicios.component';
import { ImportarModalComponent } from './customComponents/importar-modal/importar-modal.component';
import { ServiciosPendientesComponent } from './pages/servicios-pendientes/servicios-pendientes.component';
import { NotificacionesComponent } from './pages/notificaciones/notificaciones.component';
import { AjustesComponent } from './pages/ajustes/ajustes.component';
import { ReportesComponent } from './pages/reportes/reportes.component';
import { GeneralComponent } from './pages/reportes/general/general.component';
import { ClientesComponent } from './pages/reportes/clientes/clientes.component';
import { ConductoresComponent } from './pages/reportes/conductores/conductores.component';
import { ReporteClienteComponent } from './pages/reporte-cliente/reporte-cliente.component';
import { EmpleadosClienteComponent } from './pages/empleados-cliente/empleados-cliente.component';
import { HourPipe } from './pipes/hour.pipe';
import { PersonalizadoComponent } from './pages/reportes/personalizado/personalizado.component';
import { MapaComponent } from './pages/mapa/mapa.component';

@NgModule({
  declarations: [
    AppComponent,
    PagesComponent,
    LoginComponent,
    InicioComponent,
    NavbarComponent,
    SidebarComponent,
    FooterComponent,
    ListaUsuariosComponent,
    ListaClientesComponent,
    ListaConductoresComponent,
    ListaServiciosComponent,
    EstatusActivoPipe,
    CambiarContrasenaComponent,
    DatePickerComponent,
    MomentPipe,
    EstatusServicioPipe,
    ServiciosClienteComponent,
    ClockPipe,
    LogsModalComponent,
    MisServiciosComponent,
    ImportarModalComponent,
    ServiciosPendientesComponent,
    NotificacionesComponent,
    AjustesComponent,
    ReportesComponent,
    GeneralComponent,
    ClientesComponent,
    ConductoresComponent,
    ReporteClienteComponent,
    EmpleadosClienteComponent,
    HourPipe,
    PersonalizadoComponent,
    MapaComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgxDatatableModule,
    LSelect2Module,
    LeafletModule,
    BsDatepickerModule.forRoot(),
    TypeaheadModule.forRoot()
  ],
  providers: [
    CookieService
  ],
  bootstrap: [AppComponent],
  schemas:  [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class AppModule { }
