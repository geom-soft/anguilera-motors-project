import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy, RouterModule } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';


import { InAppBrowser } from '@awesome-cordova-plugins/in-app-browser/ngx';
import { IonicStorageModule } from '@ionic/storage-angular';



@NgModule({
  declarations: [
    AppComponent,
  ],
  entryComponents: [],
  imports: [
    BrowserModule, 
    RouterModule,
    HttpClientModule,
    IonicModule.forRoot(), 
    AppRoutingModule,
    IonicStorageModule.forRoot()
  ],
  providers: [InAppBrowser, { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule {}
