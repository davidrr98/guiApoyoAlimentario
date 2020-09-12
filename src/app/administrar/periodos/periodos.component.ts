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


  constructor(private periodosService: PeriodosService ) { }

  ngOnInit(): void {
    this.cargando=true;
    this.periodosService.getPeriodos()
    .subscribe( resp=>  {
      this.periodos = resp;
      this.cargando = false;
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
      }
    });
  }

}


  
 
  



