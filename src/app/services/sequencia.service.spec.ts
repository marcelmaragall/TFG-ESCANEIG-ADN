import { TestBed } from '@angular/core/testing';

import { SequenciaService } from './sequencia.service';

describe('SequenciaService', () => {
  let service: SequenciaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SequenciaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
