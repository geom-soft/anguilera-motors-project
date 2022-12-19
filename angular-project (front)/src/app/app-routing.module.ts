import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './services/auth.guard';
import { PagesComponent } from './pages/pages.component';
import { LoginComponent } from './pages/login/login.component';
import { CambiarContrasenaComponent } from './pages/cambiar-contrasena/cambiar-contrasena.component';
import { InicioComponent } from './pages/inicio/inicio.component';
import { ListaUsuariosComponent } from './pages/lista-usuarios/lista-usuarios.component';
import { ListaConductoresComponent } from './pages/lista-conductores/lista-conductores.component';
import { ListaClientesComponent } from './pages/lista-clientes/lista-clientes.component';
import { ListaServiciosComponent } from './pages/lista-servicios/lista-servicios.component';
import { ServiciosClienteComponent } from './pages/servicios-cliente/servicios-cliente.component';
import { MisServiciosComponent } from './pages/mis-servicios/mis-servicios.component';
import { ServiciosPendientesComponent } from './pages/servicios-pendientes/servicios-pendientes.component';
// import { NotificacionesComponent } from './pages/notificaciones/notificaciones.component';
// import { AjustesComponent } from './pages/ajustes/ajustes.component';
import { ReportesComponent } from './pages/reportes/reportes.component';
import { GeneralComponent } from './pages/reportes/general/general.component';
import { ClientesComponent } from './pages/reportes/clientes/clientes.component';
import { ConductoresComponent } from './pages/reportes/conductores/conductores.component';
import { ReporteClienteComponent } from './pages/reporte-cliente/reporte-cliente.component';
import { EmpleadosClienteComponent } from './pages/empleados-cliente/empleados-cliente.component';
import { PersonalizadoComponent } from './pages/reportes/personalizado/personalizado.component';
import { MapaComponent } from './pages/mapa/mapa.component';


const routes: Routes = [
  { path: 'login', component: LoginComponent },
  {
    path: '',
    component: PagesComponent,
    children: [
      { path: 'inicio',                       component: InicioComponent,                   canActivate: [AuthGuard], data: { type: ['ADMIN', 'CLIENTE'] } },
      { path: 'cambiar-contrasena',           component: CambiarContrasenaComponent,        canActivate: [AuthGuard], data: { type: ['ADMIN', 'CLIENTE'] } },
      // { path: 'ajustes',                      component: AjustesComponent,                  canActivate: [AuthGuard], data: { type: ['ADMIN'] } },
      // { path: 'buzon',                        component: NotificacionesComponent,           canActivate: [AuthGuard], data: { type: ['ADMIN'] } },
      { path: 'lista-usuarios',               component: ListaUsuariosComponent,            canActivate: [AuthGuard], data: { type: ['ADMIN'] } },
      { path: 'lista-conductores',            component: ListaConductoresComponent,         canActivate: [AuthGuard], data: { type: ['ADMIN'] } },
      { path: 'lista-clientes',               component: ListaClientesComponent,            canActivate: [AuthGuard], data: { type: ['ADMIN'] } },
      { path: 'lista-servicios',              component: ListaServiciosComponent,           canActivate: [AuthGuard], data: { type: ['ADMIN'] } },
      // { path: 'lista-borradores',             component: ServiciosPendientesComponent,      canActivate: [AuthGuard], data: { type: ['ADMIN'] } },
      { path: 'empleados/:code',              component: EmpleadosClienteComponent,         canActivate: [AuthGuard], data: { type: ['ADMIN'] } },
      { path: 'cliente/:code',                component: ServiciosClienteComponent,         canActivate: [AuthGuard], data: { type: ['ADMIN'] } },
      { path: 'mapa',                         component: MapaComponent,                     canActivate: [AuthGuard], data: { type: ['ADMIN'] } },
      { path: 'mis-servicios',                component: MisServiciosComponent,             canActivate: [AuthGuard], data: { type: ['CLIENTE'] } },
      { path: 'mi-reporte',                   component: ReporteClienteComponent,           canActivate: [AuthGuard], data: { type: ['CLIENTE'] } },
      {
        path: 'reportes',
        component: ReportesComponent,
        canActivate: [AuthGuard],
        data: {
          type: ['ADMIN']
        },
        children: [
          { path: '', component: GeneralComponent },
          { path: 'servicios',      component: GeneralComponent },
          { path: 'conductores',    component: ConductoresComponent },
          { path: 'clientes',       component: ClientesComponent },
          { path: 'personalizado',  component: PersonalizadoComponent },
          { path: '**', pathMatch: 'full', redirectTo: 'servicios' }
        ]
      },
      { path: '', pathMatch: 'full',          redirectTo: 'inicio' },
      { path: '**', pathMatch: 'full', redirectTo: 'login' }
    ]
  },
  { path: '**', pathMatch: 'full', redirectTo: 'login' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
