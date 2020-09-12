import { Component, OnInit } from '@angular/core';
import { PeriodoModel } from '../../modelos/perido.model'
import { NgForm } from '@angular/forms';

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

  guardar(form: NgForm) {
  }

}
