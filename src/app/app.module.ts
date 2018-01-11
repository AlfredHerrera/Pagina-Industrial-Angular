import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DataTablesModule } from 'angular-datatables';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';

import { NgUploaderModule } from 'ngx-uploader';
//servicios
import { ServicioOfertasService } from './servicios/servicio-ofertas.service';
import { MoverImagenesService } from './servicios/mover-imagenes.service';
import { ServicioIndustrialService } from './servicios/servicio-industrial.service';

//rutas
import { app_routing } from './app.routs';

//componentes
import { NavbarComponent } from './componentes/navbar/navbar.component';
import { DashboardComponent } from './componentes/dashboard/dashboard.component';
import { OfertasComponent } from './componentes/ofertas/ofertas.component';
import { MantenimientoComponent } from './componentes/mantenimiento/mantenimiento.component';
import { HomeComponent } from './componentes/home/home.component';
import { LoginComponent } from './componentes/login/login.component';
import { ModalsComponent } from './componentes/modals/modals.component';
import { KeysPipe } from './pipes/keys.pipe';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    DashboardComponent,
    OfertasComponent,
    MantenimientoComponent,
    HomeComponent,
    LoginComponent,
    ModalsComponent,
    KeysPipe,
  ],
  imports: [
    NgUploaderModule,
    FormsModule,
    BrowserModule,
    DataTablesModule,
    HttpClientModule,
    app_routing

  ],
  providers: [
    ServicioOfertasService,
    MoverImagenesService,
    ServicioIndustrialService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
