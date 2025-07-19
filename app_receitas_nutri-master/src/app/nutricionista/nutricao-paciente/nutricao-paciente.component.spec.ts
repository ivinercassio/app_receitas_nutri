import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NutricaoPacienteComponent } from './nutricao-paciente.component';

describe('NutricaoPacienteComponent', () => {
  let component: NutricaoPacienteComponent;
  let fixture: ComponentFixture<NutricaoPacienteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NutricaoPacienteComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NutricaoPacienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
