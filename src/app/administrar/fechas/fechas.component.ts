import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'
import { now } from 'moment';
import { pipe } from 'rxjs';
import { FechaModel } from 'src/app/modelos/fecha.model';
import { PeriodoModel } from 'src/app/modelos/perido.model';
import { FechasService } from 'src/app/servicios/fechas.service';
import Swal from 'sweetalert2';
import { PeriodosService } from '../../servicios/periodos.service'

@Component({
  selector: 'app-fechas',
  templateUrl: './fechas.component.html',
  styleUrls: ['./fechas.component.css']
})
export class FechasComponent implements OnInit {

  periodoActual: PeriodoModel;
  fechas: FechaModel[]=[];
  cargando=true;
  
  constructor(private periodosService: PeriodosService,
    private fechasService: FechasService,
    private router: Router) { }

  ngOnInit() {
    this.cargando=true;
    this.fechasService.getFechas()
    .subscribe( resp=>  {
      this.fechas = resp;
      this.fechas.sort();
      this.cargando = false;  
      for (let f of this.fechas){
        if(this.fechaActiva(f.fechaDia) && f.estado!="inactivo"){
          f.estado= "activo";
        }
        if(!this.fechasService.fechaActual(f.fechaDia)){
          f.estado= "finalizado";
        }

      }
    });

  }

  borrarFecha (fecha: FechaModel, i: number){
    Swal.fire({
      title: '¿Está seguro?',
      text: `Está seguro que desea borrar a ${ fecha.fechaDia }`,
      icon: 'question',
      showConfirmButton: true,
      showCancelButton: true
    }).then(resp =>{
      if( resp.value ){
        this.fechasService.borrarFecha(fecha.id).subscribe();
        this.fechas.splice(i,1);
      }
    });
    
  }

  establecerFecha (fecha: FechaModel, i: number ){
    Swal.fire({
      title: '¿Está seguro?',
      text: `Está seguro que desea retomar ${ fecha.fechaDia } para el periodo ${ fecha.periodo } `,
      icon: 'question',
      showConfirmButton: true,
      showCancelButton: true
    }).then(resp =>{
      if( resp.value ){
        this.fechas[i].estado= "activo";
        this.fechasService.actualizar(this.fechas[i]).subscribe();
      }
    });
  }

  desactivarFecha (fecha: FechaModel, i: number ){
    Swal.fire({
      title: '¿Está seguro?',
      text: `Está seguro que desea inactivar la fecha: ${ fecha.fechaDia }, para el periodo ${ fecha.periodo } `,
      icon: 'question',
      showConfirmButton: true,
      showCancelButton: true
    }).then(resp =>{
      if( resp.value ){
        this.fechas[i].estado= "inactivo";
        this.fechasService.actualizar(this.fechas[i]).subscribe();
      }
    });
  }

  fechaActiva(fecha: Date){
    
    let f1 = new Date(fecha); // Fecha ingresada por el usuario
    let f2 = new Date(Date.now()); //Fecha actual
    f1.setHours(0,0,0,0);
    f1.setDate(f1.getDate()+1);
    f2.setHours(0,0,0,0);
    if (f1.getTime() == f2.getTime()){
      return true;
    }
    return false;
  }

  fechaFutura(fecha: Date){

    return this.fechasService.fechaActual(fecha);
     
  }

}
