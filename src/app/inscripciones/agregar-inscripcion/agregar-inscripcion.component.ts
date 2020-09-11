import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl, FormArray } from '@angular/forms';
//import { ValidadoresService } from '../../services/validadores.service'


@Component({
  selector: 'app-agregar-inscripcion',
  templateUrl: './agregar-inscripcion.component.html',
  styleUrls: ['./agregar-inscripcion.component.css']
})
export class AgregarInscripcionComponent implements OnInit {

  forma: FormGroup;

  constructor(private fb: FormBuilder) {

    this.crearFormulario();
    this.cargarDataAlFormulario();
    this.crearListeners();

  }

  ngOnInit(): void {
  }

  get pasatiempos() {
    return this.forma.get('pasatiempos') as FormArray;
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

  get callesNoValido() {
    return this.forma.get('direccion.calles').invalid && this.forma.get('direccion.calles').touched;
  }
  get ciudadNoValido() {
    return this.forma.get('direccion.ciudad').invalid && this.forma.get('direccion.ciudad').touched;
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
      direccion: this.fb.group({
        calles: ['', Validators.required],
        ciudad: ['', Validators.required],
      }),
      pasatiempos: this.fb.array([]),
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
        nombre: "",
        apellido: "Perez",
        codigo: "",
        documento: "",
        correo: "juan@gmaii.com",
        facultad: "",
        carrera: "s",
        estrato: "",
        localidad: "",
        barrio: "",
        telefono: "",
        direccion: {
          calles: "calle",
          ciudad: "ottawa"
        }
      }
    );
    ['Comer', 'Dormir'].forEach(valor => this.pasatiempos.push(this.fb.control(valor)));
  }
  agregarPasatiempo() {
    this.pasatiempos.push(this.fb.control('Nuevo elemento', Validators.required));
  }
  borrarPasatiempo(i: number) {
    this.pasatiempos.removeAt(i);

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
