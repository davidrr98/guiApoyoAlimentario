import { ReactiveFormsModule } from "@angular/forms";
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms'
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { HomeComponent } from './componentes/home/home.component';
import { InscripcionesComponent } from './afiliacion/inscripciones/inscripciones.component';
import { InscripcionComponent } from './afiliacion/inscripcion/inscripcion.component';
import { PeriodosComponent } from './administrar/periodos/periodos.component';
import { PeriodoComponent } from './administrar/periodo/periodo.component';
import { CargarInscripcionesComponent } from './administrar/cargar-inscripciones/cargar-inscripciones.component';
import { FechasComponent } from './administrar/fechas/fechas.component';
import { FechaComponent } from './administrar/fecha/fecha.component';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    InscripcionesComponent,
    InscripcionComponent,
    PeriodosComponent,
    PeriodoComponent,
    CargarInscripcionesComponent,
    FechasComponent,
    FechaComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    CommonModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
