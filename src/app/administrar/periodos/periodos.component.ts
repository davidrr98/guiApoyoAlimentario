import { Component, OnInit } from '@angular/core';
import { PeriodoModel } from '../../modelos/perido.model';
/* import { HeroesService } from 'src/app/services/heroes.service'; */
import Swal from 'sweetalert2';

@Component({
  selector: 'app-periodos',
  templateUrl: './periodos.component.html',
  styleUrls: ['./periodos.component.css']
})
export class PeriodosComponent implements OnInit {

  periodos: PeriodoModel[]=[];
  cargando=true;


  constructor() { }

  ngOnInit(): void {
    this.cargando=false;
    /* this.heroesService.getHeroes()
    .subscribe( resp=>  {
      this.heroes = resp;
      this.cargando = false;
    }); */
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
        //this.periodosService.borrarPeriodo(periodo.id).subscribe();
        this.periodos.splice(i,1);
      }
    });
  }

}


  
 
  



