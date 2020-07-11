import { TestBed } from '@angular/core/testing';

import { EscaneigService } from './escaneig.service';

describe('EscaneigService', () => {
  let service: EscaneigService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EscaneigService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
