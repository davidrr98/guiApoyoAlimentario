import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { PeriodoModel } from '../modelos/perido.model';
import { map } from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class PeriodosService {
  private url = " https://apoyo-back.firebaseio.com";

  constructor( private http: HttpClient ) { }

  crearPeriodo (periodo: PeriodoModel){
    return this.http.post(`${ this.url}/periodos.json`, periodo)
    .pipe( map( (resp :any )=> {
      periodo.id=resp.name;
      return periodo;
    })     
    );
  }
  actualizar (periodo :PeriodoModel){
    console.log("vamos en el servicio");
    const periodoTemp ={
      ...periodo
    };

    delete periodoTemp.id;
    return this.http.put(`${ this.url}/periodos/${ periodo.id }.json`, periodoTemp);   

  }
  borrarPeriodo ( id: string){
    return this.http.delete(`${ this.url}/periodos/${ id }.json`);
  }
  getPeriodo( id:string){
    return this.http.get(`${ this.url}/periodos/${ id }.json`);
  }

  


  getPeriodos(){
    return this.http.get(`${ this.url}/periodos.json`)
    .pipe(
      map( this.crearArreglo )
    );
  }

  private crearArreglo(periodosObj: object){
    const periodos: PeriodoModel [] = [];

    if ( periodosObj ===null) { return [];}

    Object.keys( periodosObj).forEach ( key => {
      const periodo: PeriodoModel =periodosObj[key];
      periodo.id=key;

      periodos.push(periodo);
    });

    return periodos;

  }
}
