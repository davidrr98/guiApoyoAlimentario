import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CargarInscripcionesComponent } from './cargar-inscripciones.component';

describe('CargarInscripcionesComponent', () => {
  let component: CargarInscripcionesComponent;
  let fixture: ComponentFixture<CargarInscripcionesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CargarInscripcionesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CargarInscripcionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
