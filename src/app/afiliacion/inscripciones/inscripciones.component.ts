import { Component, OnInit } from '@angular/core';
import { InscripcionModel } from '../../modelos/inscripcion.model';
/* import { HeroesService } from 'src/app/services/heroes.service'; */
import Swal from 'sweetalert2';
import { InscripcionesService } from 'src/app/servicios/inscripciones.service';


@Component({
  selector: 'app-inscripciones',
  templateUrl: './inscripciones.component.html',
  styleUrls: ['./inscripciones.component.css']
})
export class InscripcionesComponent implements OnInit {

  
  inscripciones: InscripcionModel[]=[];
  cargando=true;


  constructor(private inscripcionesService: InscripcionesService ) { }

  ngOnInit(): void {
    this.cargando=true;
    /* this.inscripcionesService.getinscripciones()
    .subscribe( resp=>  {
      this.inscripciones = resp;
      this.cargando = false;
    }); */
  }

  borrarinscripcion (inscripcion: InscripcionModel, i: number){
    Swal.fire({
      title: '¿Está seguro?',
      text: `Está seguro que desea borrar a ${ inscripcion.id }`,
      icon: 'question',
      showConfirmButton: true,
      showCancelButton: true
    }).then(resp =>{
      if( resp.value ){
        //this.inscripcionesService.borrarinscripcion(inscripcion.id).subscribe();
        this.inscripciones.splice(i,1);
      }
    });
  }


}
