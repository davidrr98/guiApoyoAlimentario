import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './componentes/home/home.component'
import { ConsultarInscripcionComponent } from './inscripciones/consultar-inscripcion/consultar-inscripcion.component';
import { AgregarInscripcionComponent } from './inscripciones/agregar-inscripcion/agregar-inscripcion.component';
import { EditarInscripcionComponent } from './inscripciones/editar-inscripcion/editar-inscripcion.component';
import { PeriodosComponent } from './administrar/periodos/periodos.component';
import { PeriodoComponent } from './administrar/periodo/periodo.component';
import { CargarInscripcionesComponent } from './administrar/cargar-inscripciones/cargar-inscripciones.component';


const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'inscripciones/consultar', component: ConsultarInscripcionComponent },
  { path: 'inscripciones/agregar', component: AgregarInscripcionComponent },
  { path: 'inscripciones/editar', component: EditarInscripcionComponent },
  { path: 'periodos', component: PeriodosComponent },
  { path: 'periodo/:id', component: PeriodoComponent },
  { path: 'cargarInscripciones', component: CargarInscripcionesComponent },
  { path: '**', pathMatch: 'full', redirectTo: '' }
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
