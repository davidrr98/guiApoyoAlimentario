import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl, FormArray } from '@angular/forms';
//import { ValidadoresService } from '../../services/validadores.service'


@Component({
  selector: 'app-inscripcion',
  templateUrl: './inscripcion.component.html',
  styleUrls: ['./inscripcion.component.css']
})
export class InscripcionComponent implements OnInit {

  forma: FormGroup;

  constructor(private fb: FormBuilder) {

    this.crearFormulario();
    this.cargarDataAlFormulario();
    this.crearListeners();

  }

  ngOnInit(): void {
  }

  get periodoNoValido() {
    return this.forma.get('periodo').invalid && this.forma.get('periodo').touched;
  }

  get nombreNoValido() {
    return this.forma.get('nombre').invalid && this.forma.get('nombre').touched;
  }

  get apellidoNoValido() {
    return this.forma.get('apellido').invalid && this.forma.get('apellido').touched;
  }

  get codigoNoValido() {
    return this.forma.get('codigo').invalid && this.forma.get('codigo').touched;
  }

  get correoNoValido() {
    return this.forma.get('correo').invalid && this.forma.get('correo').touched;
  }

  get documentoNoValido() {
    return this.forma.get('documento').invalid && this.forma.get('documento').touched;
  }

  get direccionNoValido() {
    return this.forma.get('direccion').invalid && this.forma.get('direccion').touched;
  }
  get ciudadNoValido() {
    return this.forma.get('ciudad').invalid && this.forma.get('ciudad').touched;
  }
  get facultadNoValido() {
    return this.forma.get('facultad').invalid && this.forma.get('facultad').touched;
  }

  get carreraNoValido() {
    return this.forma.get('carrera').invalid && this.forma.get('carrera').touched;
  }

  get estratoNoValido() {
    return this.forma.get('estrato').invalid && this.forma.get('estrato').touched;
  }

  get localidadNoValido() {
    return this.forma.get('localidad').invalid && this.forma.get('localidad').touched;
  }

  get barrioNoValido() {
    return this.forma.get('barrio').invalid && this.forma.get('barrio').touched;
  }

  get telefonoNoValido() {
    return this.forma.get('telefono').invalid && this.forma.get('telefono').touched;
  }

  crearFormulario() {

    this.forma = this.fb.group({
      periodo: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(6)]],
      nombre: ['', [Validators.required, Validators.minLength(5)]],
      apellido: ['', [Validators.required, Validators.minLength(5)]],
      codigo: ['', [Validators.required, Validators.minLength(11), Validators.maxLength(11)]],
      correo: ['', [Validators.required, Validators.email]],
      documento: ['', [Validators.required]],
      facultad: ['', Validators.required],
      carrera: ['', Validators.required],
      estrato: ['', Validators.required],
      localidad: ['', Validators.required],
      barrio: ['', Validators.required],
      telefono: ['', Validators.required],
      direccion: ['', Validators.required],
      ciudad: ['', Validators.required],
    },{
      //validators: this.validadores.passwordsIguales('facultad','pass2')
    });

  }
  crearListeners(){
    this.forma.valueChanges.subscribe( valor => {
      console.log(valor)
    })

  }

  cargarDataAlFormulario() {
    //this.forma.setValue(
    this.forma.reset(
      { 
        periodo: "2002-2",
        nombres: "",
        apellidos: "Perez",
        codigo: "",
        documento: "",
        correo: "juan@gmaii.com",
        facultad: "",
        carrera: "s",
        estrato: "",
        localidad: "",
        barrio: "",
        telefono: "",
        direccion: "calle",
        ciudad: "ottawa"
      }
    );
  }

  guardar() {
    if (this.forma.invalid) {
      return Object.values(this.forma.controls).forEach(control => {
        if (control instanceof FormGroup) {
          Object.values(control.controls).forEach(control => { control.markAsTouched() });
        } else {
          control.markAsTouched();
        }
      });
    }
    this.forma.reset({
      nombre: 'Ingrese nombre'
    });
  }
}
