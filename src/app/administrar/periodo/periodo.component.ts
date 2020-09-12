import { Component, OnInit } from '@angular/core';
import { PeriodoModel } from '../../modelos/perido.model'
import { NgForm } from '@angular/forms';
import Swal from 'sweetalert2';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-periodo',
  templateUrl: './periodo.component.html',
  styleUrls: ['./periodo.component.css']
})
export class PeriodoComponent implements OnInit {

  periodo = new PeriodoModel();


  constructor() { }

  ngOnInit(): void {
  }

  guardar(form:NgForm){

    if(form.invalid){
      console.log('Formulario no valido')
      return;
    }

    Swal.fire({
      title: 'Espere',
      text:'Guardando información',
      icon: 'info',
      allowOutsideClick: false,
    });

    Swal.showLoading();

    let peticion: Observable<any>;
    
    if(this.periodo.id){
      //peticion = this.periodosService.actualizarperiodo(this.periodo);   
    }else{
      //peticion = this.periodosService.crearperiodo(this.periodo);  
    }

    peticion.subscribe(resp => {
      
      Swal.fire({
        title: this.periodo.nombre,
        text: 'Se actualizo correctamente',
        icon: 'success'
      });

    });
    

    
  }

}
