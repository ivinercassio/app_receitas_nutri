import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalheReceitaComponent } from './detalhe-receita.component';

describe('DetalheReceitaComponent', () => {
  let component: DetalheReceitaComponent;
  let fixture: ComponentFixture<DetalheReceitaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetalheReceitaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DetalheReceitaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
