import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultarReceitaComponent } from './consultar-receita.component';

describe('ConsultarReceitaComponent', () => {
  let component: ConsultarReceitaComponent;
  let fixture: ComponentFixture<ConsultarReceitaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConsultarReceitaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ConsultarReceitaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
