import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AgregarInscripcionComponent } from './agregar-inscripcion.component';

describe('AgregarInscripcionComponent', () => {
  let component: AgregarInscripcionComponent;
  let fixture: ComponentFixture<AgregarInscripcionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AgregarInscripcionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AgregarInscripcionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
