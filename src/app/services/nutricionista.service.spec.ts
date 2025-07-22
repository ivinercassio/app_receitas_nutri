import { TestBed } from '@angular/core/testing';

import { NutricionistaService } from './nutricionista.service';

describe('NutricionistaService', () => {
  let service: NutricionistaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NutricionistaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
