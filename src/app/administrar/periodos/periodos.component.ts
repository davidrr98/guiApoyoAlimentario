import { Component, OnInit } from '@angular/core';
import { PeriodoModel } from '../../modelos/perido.model';
/* import { HeroesService } from 'src/app/services/heroes.service'; */
import Swal from 'sweetalert2';
import { PeriodosService } from 'src/app/servicios/periodos.service';

@Component({
  selector: 'app-periodos',
  templateUrl: './periodos.component.html',
  styleUrls: ['./periodos.component.css']
})
export class PeriodosComponent implements OnInit {

  periodos: PeriodoModel[]=[];
  cargando=true;
  bntNuevo= true;


  constructor(private periodosService: PeriodosService ) { }

  ngOnInit(): void {
    this.cargando=true;
    this.periodosService.getPeriodos()
    .subscribe( resp=>  {
      this.periodos = resp.reverse();
      this.cargando = false;
      this.bntNuevo= true;  
      for (let periodo of this.periodos){
        if(periodo.estado!=='finalizado'){
          this.bntNuevo= false;
          break;
        }
      }
    });
  }

  borrarPeriodo (periodo: PeriodoModel, i: number){
    Swal.fire({
      title: '¿Está seguro?',
      text: `Está seguro que desea borrar a ${ periodo.nombre }`,
      icon: 'question',
      showConfirmButton: true,
      showCancelButton: true
    }).then(resp =>{
      if( resp.value ){
        this.periodosService.borrarPeriodo(periodo.id).subscribe();
        this.periodos.splice(i,1);
        this.bntNuevo=true;
      }
    });
    
  }

  iniciarPeriodo (periodo: PeriodoModel, i: number ){
    Swal.fire({
      title: '¿Está seguro?',
      text: `Está seguro que desea iniciar ${ periodo.nombre }`,
      icon: 'question',
      showConfirmButton: true,
      showCancelButton: true
    }).then(resp =>{
      if( resp.value ){
        this.periodos[i].estado= "activo";
        this.periodosService.actualizar(this.periodos[i]).subscribe();
      }
    });
  }
  pausarPeriodo (periodo: PeriodoModel, i: number ){
    Swal.fire({
      title: '¿Está seguro?',
      text: `Está seguro que desea detener ${ periodo.nombre }`,
      icon: 'question',
      showConfirmButton: true,
      showCancelButton: true
    }).then(resp =>{
      if( resp.value ){
        this.periodos[i].estado= "inactivo";
        this.periodosService.actualizar(this.periodos[i]).subscribe();
      }
    });
  }
  finalizarPeriodo (periodo: PeriodoModel, i: number ){
    Swal.fire({
      title: '¿Está seguro?',
      text: `Está seguro que desea finalizar ${ periodo.nombre }`,
      icon: 'question',
      showConfirmButton: true,
      showCancelButton: true
    }).then(resp =>{
      if( resp.value ){
        this.periodos[i].estado= "finalizado";
        this.periodosService.actualizar(this.periodos[i]).subscribe();
        this.bntNuevo=true;
      }
    });
  }

}


  
 
  



