import { TestBed } from '@angular/core/testing';

import { PatologiaService } from './patologia.service';

describe('PatologiaService', () => {
  let service: PatologiaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PatologiaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
