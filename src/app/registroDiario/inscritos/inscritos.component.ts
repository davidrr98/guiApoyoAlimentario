import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router'
import { pipe } from 'rxjs';
import { FechaModel } from 'src/app/modelos/fecha.model';
import { RegistroInscritoModel } from 'src/app/modelos/registroInscrito.model';
import { NgForm } from '@angular/forms';
import Swal from 'sweetalert2';
import { Observable } from 'rxjs';
import { PeriodosService } from '../../servicios/periodos.service';
import { FechasService } from '../../servicios/fechas.service'
import { RegistrosInscritosService } from '../../servicios/registros-inscritos.service'
import { async } from 'rxjs/internal/scheduler/async';

@Component({
  selector: 'app-inscritos',
  templateUrl: './inscritos.component.html',
  styleUrls: ['./inscritos.component.css']
})
export class InscritosComponent implements OnInit {

  registosAprovados: string [] = []
  registroBase = new RegistroInscritoModel();

  fechaActual = new FechaModel();

  constructor(private fechasService: FechasService,
    private registroInscritoService: RegistrosInscritosService,
    private router: Router) { }

  async ngOnInit() {

    this.fechasService.getFechas()
      .subscribe(async resp => {
        this.fechaActual = this.buscarFechaActiva(resp);

        if (this.fechaActual == null) {
          //Se permite unicamente crear registro si existe la fecha
          Swal.fire({
            title: 'Crear registros',
            text: 'No hay una fecha activa para crear los registros',
            icon: 'error',
            confirmButtonText: 'OK'
          });
          this.router.navigateByUrl('');
        } else {
          /* this.registroBase.id = ""; */
          this.registroBase.codigo = "";
          this.registroBase.sede = "";
          this.registroBase.fecha = this.fechaActual.fechaDia;
          
        }
      });
  }

  guardar(form: NgForm) {

    if (form.invalid) {
      Object.values(form.controls).forEach(control => {
        control.markAsTouched();
      });
      return;
    }

    Swal.fire({
      title: 'Espere',
      text: 'Guardando información',
      icon: 'info',
      allowOutsideClick: false,
    });
    Swal.showLoading();


    this.registroInscritoService.crearRegistro(this.registroBase)
    .subscribe(resp => {
      Swal.fire({
        title: this.registroBase.codigo,
        text: 'Se registro el estudiante correctamente',
        icon: 'success'
      });
      this.registosAprovados.push(this.registroBase.codigo);
      let tempSedeTemp = this.registroBase.sede;
      this.registroBase = new RegistroInscritoModel()
      this.registroBase.codigo="";
      this.registroBase.codigo = "";
      this.registroBase.sede = tempSedeTemp;
      this.registroBase.fecha = this.fechaActual.fechaDia;        
    });

   
  }


  buscarFechaActiva(fechas: FechaModel[]) {

    if (fechas === null) { return null; }

    let fechasAct: FechaModel;

    Object.keys(fechas).forEach(key => {
      const fecha: FechaModel = fechas[key];
      if (this.fechaActiva(fecha.fechaDia)) {
        fechasAct = fecha;
      }
    });
    return fechasAct;
  }

  fechaActiva(fecha: Date) {

    let f1 = new Date(fecha); // Fecha ingresada por el usuario
    let f2 = new Date(Date.now()); //Fecha actual
    f1.setHours(0, 0, 0, 0);
    f1.setDate(f1.getDate() + 1);
    f2.setHours(0, 0, 0, 0);
    if (f1.getTime() == f2.getTime()) {
      return true;
    }
    return false;
  }

}




