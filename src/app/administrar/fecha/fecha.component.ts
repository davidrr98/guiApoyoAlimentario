import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute,Router } from '@angular/router'
import { pipe } from 'rxjs';
import { FechaModel } from 'src/app/modelos/fecha.model';
import { PeriodoModel } from 'src/app/modelos/perido.model';
import { NgForm } from '@angular/forms';
import Swal from 'sweetalert2';
import { Observable } from 'rxjs';
import { PeriodosService } from '../../servicios/periodos.service';
import { FechasService } from '../../servicios/fechas.service'

@Component({
  selector: 'app-fecha',
  templateUrl: './fecha.component.html',
  styleUrls: ['./fecha.component.css']
})
export class FechaComponent implements OnInit {

  fecha = new FechaModel();
  fechas: FechaModel[]=[];
  periodoActual: PeriodoModel;
  
  constructor(private periodosService: PeriodosService,
    private fechasService: FechasService,
    private route: ActivatedRoute,
    private router: Router) { }

  async ngOnInit() {
    /* var subsServ= this.periodosService.getPeriodoNuevo();
    const date = await subsServ.toPromise(); */

    this.periodosService.getPeriodos()
      .subscribe(async resp => {
        this.periodoActual=this.buscarPeriodoActivo( resp);
        if (this.periodoActual == null) {
          //Se permite unicamente crear para periodos activos
          Swal.fire({
            title: 'Crear Fecha',
            text: 'No hay un periodo activo para crear las fechas',
            icon: 'error',
            confirmButtonText: 'OK'
          });
          this.router.navigateByUrl('');
        }else{
          this.fecha.periodo=this.periodoActual.nombre;
          const id = this.route.snapshot.paramMap.get('id');
          if(id!="nuevo"){   
            //Se obtiene el id de la fecha a editar       
            this.fechasService.getFecha(id)
            .subscribe( (resp: FechaModel)=>{
              this.fecha=resp;
              this.fecha.id=id;
            });   
          }else{
            //Cargamos fechas para comprobaciones
            this.fechasService.getFechas()
            .subscribe( resp=>  {
              this.fechas = resp;
              this.fechas.sort();
            });
          }
        }
      });
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

    if(!this.fechasService.fechaActual(this.fecha.fechaDia)){
      Swal.fire({
        title: `Error en la Fecha: ${ this.fecha.fechaDia } `,
        text: `Por favor agregue una fecha mayor o igual a la del dia actual `,
        icon: 'error',
        showConfirmButton: true,
      });
      return;
    }
    if(!this.fechaDiferente(this.fecha.fechaDia)){
      Swal.fire({
        title: `Error en la Fecha: ${ this.fecha.fechaDia } `,
        text: `Ya existe una fecha para este Día`,
        icon: 'error',
        showConfirmButton: true,
      });
      return;
    } 
    if(this.fecha.id){
      console.log("vamos en el componente actualizar");
      peticion = this.fechasService.actualizar(this.fecha); 
    }else{
      console.log("vamos en el componente crear");
      this.fecha.estado="pendiente";
      peticion = this.fechasService.crearFecha(this.fecha);
    }
    

    peticion.subscribe(resp => {
      
      Swal.fire({
        title: this.fecha.fechaDia,
        text: 'Se actualizo correctamente',
        icon: 'success'
      });
      this.router.navigateByUrl('/fechas');

    }); 
    
  }

  

  buscarPeriodoActivo( periodos:PeriodoModel[]){
    if ( periodos ===null) { return null;}
    var periodoAct : PeriodoModel;
    Object.keys( periodos).forEach ( key => {
      const periodo: PeriodoModel =periodos[key];
      //periodo.id=key;
      if(periodo.estado=="activo"){
        periodoAct = periodo;
      }
    });

    return periodoAct;
  }

  fechaDiferente(fecha: Date):boolean{
    let f1 = new Date(fecha); // Fecha ingresada por el usuario
    let fechaDif =true;

    for (let f of this.fechas){
      let f2 = new Date(f.fechaDia);
      if (f1.getTime() == f2.getTime()){
        console.log("Son la misma fecha");
        return false;
      }
    }
    return fechaDif;
  }

}
