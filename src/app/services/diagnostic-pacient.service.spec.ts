import { TestBed } from '@angular/core/testing';

import { DiagnosticPacientService } from './diagnostic-pacient.service';

describe('DiagnosticPacientService', () => {
  let service: DiagnosticPacientService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DiagnosticPacientService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
