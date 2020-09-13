import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './componentes/home/home.component'
import { InscripcionesComponent } from './afiliacion/inscripciones/inscripciones.component';
import { InscripcionComponent } from './afiliacion/inscripcion/inscripcion.component';
import { PeriodosComponent } from './administrar/periodos/periodos.component';
import { PeriodoComponent } from './administrar/periodo/periodo.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'inscripciones', component: InscripcionesComponent },
  { path: 'inscripcion/:id', component: InscripcionComponent },
  { path: 'periodos', component: PeriodosComponent },
  { path: 'periodo/:id', component: PeriodoComponent },
  { path: '**', pathMatch: 'full', redirectTo: '' }
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
