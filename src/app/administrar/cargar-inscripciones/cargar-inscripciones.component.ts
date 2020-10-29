import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'
import { pipe } from 'rxjs';
import { PeriodoModel } from 'src/app/modelos/perido.model';
import Swal from 'sweetalert2';
import { PeriodosService } from '../../servicios/periodos.service'


@Component({
  selector: 'app-cargar-inscripciones',
  templateUrl: './cargar-inscripciones.component.html',
  styleUrls: ['./cargar-inscripciones.component.css']
})
export class CargarInscripcionesComponent implements OnInit {

  periodo= new PeriodoModel();
  constructor(private periodosService: PeriodosService,
    private router: Router) { }

  async ngOnInit() {
    /* var subsServ= this.periodosService.getPeriodoNuevo();
    const date = await subsServ.toPromise(); */

    this.periodosService.getPeriodoNuevo()
      .subscribe(async resp => {
        this.periodo = resp;
        if (this.periodo == null) {
          Swal.fire({
            title: 'Crear periodo',
            text: 'No hay peridos nuevo para cargar los datos',
            icon: 'error',
            confirmButtonText: 'OK'
          });
          this.router.navigateByUrl('');
        }
      });


  }

  guardar() {

    Swal.fire({
      title: 'Espere',
      text:'Guardando información',
      icon: 'info',
      allowOutsideClick: false,
    });

    Swal.showLoading();

    this.periodo.estado = "inscripci";
    this.periodosService.actualizar(this.periodo).subscribe();
    Swal.fire({
      title: this.periodo.nombre,
      text: 'Se cargaron los datos de forma correcta',
      icon: 'success'
    });
    this.router.navigateByUrl('/');
  }

}
