import { Component, Input, OnInit, OnChanges } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router'
import { pipe } from 'rxjs';
import { FechaModel } from 'src/app/modelos/fecha.model';
import { RegistroInscritoModel } from 'src/app/modelos/registroInscrito.model';
import { SedeModel } from 'src/app/modelos/sede.model';
import { NgForm } from '@angular/forms';
import Swal from 'sweetalert2';
import { Observable } from 'rxjs';
import { PeriodosService } from '../../servicios/periodos.service';
import { FechasService } from '../../servicios/fechas.service'
import { RegistrosInscritosService } from '../../servicios/registros-inscritos.service'
import { SedesService } from '../../servicios/sedes.service'


@Component({
  selector: 'app-inscritos',
  templateUrl: './inscritos.component.html',
  styleUrls: ['./inscritos.component.css']
})
export class InscritosComponent implements OnInit {

  inscritos: boolean;
  sedesTemp: SedeModel[] = [];
  sedesAccesso: SedeModel[] = []
  /* sedesAccesso = ["Ingenieria","Macarena","Vivero", "Bosa"]; */
  registosAprovados: string[] = []
  registroBase = new RegistroInscritoModel();

  fechaActual = new FechaModel();

  constructor(private fechasService: FechasService,
    private registroInscritoService: RegistrosInscritosService,
    private sedesService: SedesService,
    private router: Router, private route: ActivatedRoute,) { }

  async ngOnInit() {
    console.log("init")
    this.inscritos = true;
    let tipo = this.route.snapshot.paramMap.get('tipo');
    if (tipo === "no-inscritos") {
      this.inscritos = false;
    } else {
      if (tipo === "inscritos") {
        this.inscritos = true;
      }
    }
    console.log(this.inscritos);

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

      

      this.sedesService.getSedes()
      .subscribe( resp=>  {
        this.sedesAccesso = resp;
      });

  }

  OnChanges(){
    console.log("cambios")

  }

  guardar(form: NgForm) {

    if (form.invalid || this.sedesAccesso.length === 0) {
      Object.values(form.controls).forEach(control => {
        control.markAsTouched();
      });
      return;
    }
    this.registroBase.sede = form.value['sede'];
    console.log(form);
    console.log(this.registroBase);

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
        this.registroBase.codigo = "";
        this.registroBase.codigo = "";
        this.registroBase.sede = tempSedeTemp;
        this.registroBase.fecha = this.fechaActual.fechaDia;
      });

    Object.values(form.controls).forEach(control => {
      control.markAsUntouched();
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
  cargarSedes() { //temporal
    let ingenieria = new SedeModel();
    ingenieria.id = "1";
    ingenieria.nombre = "Ingenieria";

    let macarena = new SedeModel();
    macarena.id = "2";
    macarena.nombre = "Macarena";

    let vivero = new SedeModel();
    vivero.id = "3";
    vivero.nombre = "Vivero";

    this.sedesAccesso.push(ingenieria);
    this.sedesAccesso.push(macarena);
    this.sedesAccesso.push(vivero);

  }

}




