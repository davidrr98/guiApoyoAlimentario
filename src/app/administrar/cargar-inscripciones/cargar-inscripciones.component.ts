import { formatCurrency } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { HttpEventType, HttpResponse } from '@angular/common/http';
import { Router } from '@angular/router'
import { pipe } from 'rxjs';
import { PeriodoModel } from 'src/app/modelos/perido.model';
import { InscripcionesService } from 'src/app/servicios/inscripciones.service';
import Swal from 'sweetalert2';
import { PeriodosService } from '../../servicios/periodos.service'


@Component({
  selector: 'app-cargar-inscripciones',
  templateUrl: './cargar-inscripciones.component.html',
  styleUrls: ['./cargar-inscripciones.component.css']
})
export class CargarInscripcionesComponent implements OnInit {

  currentFile: File;
  progress = 0;
  message = '';

  periodo= new PeriodoModel();
 
  constructor(private periodosService: PeriodosService,
    private inscripcionesService: InscripcionesService,
    private router: Router) { }

  async ngOnInit() {
    

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

  cargar(evt) {
    let files = evt.target.files; // FileList object
    let file = files[0];
    this.currentFile = file;
  }

  upload(): void {
    this.progress = 0;
  
    //this.currentFile = this.inscripcionesCSV[0];
    //console.log(this.inscripcionesCSV)

     Swal.fire({
      title: 'Espere',
      text:'Subiendo archivo',
      icon: 'info',
      allowOutsideClick: false,
    });

    Swal.showLoading();

    this.inscripcionesService.subirInscripciones(this.currentFile,this.periodo).subscribe();
    
    
    Swal.fire({
      title: this.periodo.nombre,
      text: 'Se cargaron los datos de forma correcta',
      icon: 'success'
    });
    this.router.navigateByUrl('/'); 
  }

}
