import { TestBed } from '@angular/core/testing';

import { ReceitaIngredienteService } from './receita-ingrediente.service';

describe('ReceitaIngredienteService', () => {
  let service: ReceitaIngredienteService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ReceitaIngredienteService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
