import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuscaReceitasComponent } from './busca-receitas.component';

describe('BuscaReceitasComponent', () => {
  let component: BuscaReceitasComponent;
  let fixture: ComponentFixture<BuscaReceitasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BuscaReceitasComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BuscaReceitasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
