import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { HomeComponent } from './componentes/home/home.component';
import { ConsultarInscripcionComponent } from './inscripciones/consultar-inscripcion/consultar-inscripcion.component';
import { AgregarInscripcionComponent } from './inscripciones/agregar-inscripcion/agregar-inscripcion.component';
import { EditarInscripcionComponent } from './inscripciones/editar-inscripcion/editar-inscripcion.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    ConsultarInscripcionComponent,
    AgregarInscripcionComponent,
    EditarInscripcionComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
