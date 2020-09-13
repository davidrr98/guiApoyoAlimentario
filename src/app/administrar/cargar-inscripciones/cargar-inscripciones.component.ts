import { Component, OnInit } from '@angular/core';
import { PeriodoModel } from 'src/app/modelos/perido.model';
import { PeriodosService} from '../../servicios/periodos.service'

@Component({
  selector: 'app-cargar-inscripciones',
  templateUrl: './cargar-inscripciones.component.html',
  styleUrls: ['./cargar-inscripciones.component.css']
})
export class CargarInscripcionesComponent implements OnInit {
  
  periodo: PeriodoModel;
  constructor(private periodosService: PeriodosService) { }

  ngOnInit(): void {
    this.periodosService.getPeriodoNuevo()
    .subscribe( resp=>  
      this.periodo = resp
    );
  }

  guardar (){
    alert("se guardo O.o")

    this.periodo.estado="inscripciones";
    this.periodosService.actualizar(this.periodo).subscribe();
  }

}
