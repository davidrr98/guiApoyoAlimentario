import { Component, OnInit } from '@angular/core';
import { PeriodoModel } from '../../modelos/perido.model'
import { NgForm } from '@angular/forms';
import Swal from 'sweetalert2';
import { Observable } from 'rxjs';
import { PeriodosService} from '../../servicios/periodos.service'
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-periodo',
  templateUrl: './periodo.component.html',
  styleUrls: ['./periodo.component.css']
})
export class PeriodoComponent implements OnInit {

  periodo = new PeriodoModel();


  constructor(private periodosService: PeriodosService ,
    private route: ActivatedRoute,
    private router: Router) {

    
    
   }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if(id!=="nuevo"){
      this.periodosService.getPeriodo(id)
      .subscribe( (resp: PeriodoModel)=>{
        console.log(resp)
        this.periodo=resp;
      });
    }
    
  }

  guardar(form:NgForm){
    if(form.invalid){
      Object.values(form.controls).forEach(control =>{
        control.markAsTouched();
      });
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
      peticion = this.periodosService.actualizar(this.periodo); 
    }else{
      peticion = this.periodosService.crearPeriodo(this.periodo);
    }
    

    peticion.subscribe(resp => {
      console.log(resp)
      Swal.fire({
        title: this.periodo.nombre,
        text: 'Se actualizo correctamente',
        icon: 'success'
      });
      this.router.navigateByUrl('/periodos');
    });

  }

}