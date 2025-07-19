import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormularioReceitaComponent } from './formulario-receita.component';

describe('FormularioReceitaComponent', () => {
  let component: FormularioReceitaComponent;
  let fixture: ComponentFixture<FormularioReceitaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormularioReceitaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FormularioReceitaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
