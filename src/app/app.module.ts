import { ReactiveFormsModule } from "@angular/forms";
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms'
import { HttpClientModule } from '@angular/common/http'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { HomeComponent } from './componentes/home/home.component';
import { ConsultarInscripcionComponent } from './inscripciones/consultar-inscripcion/consultar-inscripcion.component';
import { AgregarInscripcionComponent } from './inscripciones/agregar-inscripcion/agregar-inscripcion.component';
import { EditarInscripcionComponent } from './inscripciones/editar-inscripcion/editar-inscripcion.component';
import { PeriodosComponent } from './administrar/periodos/periodos.component';
import { PeriodoComponent } from './administrar/periodo/periodo.component';
import { CargarInscripcionesComponent } from './administrar/cargar-inscripciones/cargar-inscripciones.component';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    ConsultarInscripcionComponent,
    AgregarInscripcionComponent,
    EditarInscripcionComponent,
    PeriodosComponent,
    PeriodoComponent,
    CargarInscripcionesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
