import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { PeriodoModel } from '../modelos/perido.model';
import { map } from 'rxjs/operators'
import { InscripcionModel } from '../modelos/inscripcion.model';

@Injectable({
  providedIn: 'root'
})
export class InscripcionesService {

  private url = " https://apoyo-back.firebaseio.com";

  constructor( private http: HttpClient ) { }

}
