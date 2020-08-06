import { TestBed } from '@angular/core/testing';

import { MedgenService } from './medgen.service';

describe('MedgenService', () => {
  let service: MedgenService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MedgenService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
