import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultarPacientesComponent } from './consultar-pacientes.component';

describe('ConsultarPacientesComponent', () => {
  let component: ConsultarPacientesComponent;
  let fixture: ComponentFixture<ConsultarPacientesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConsultarPacientesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ConsultarPacientesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
