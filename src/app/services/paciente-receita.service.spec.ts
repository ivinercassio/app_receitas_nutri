import { TestBed } from '@angular/core/testing';

import { PacienteReceitaService } from './paciente-receita.service';

describe('PacienteReceitaService', () => {
  let service: PacienteReceitaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PacienteReceitaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
