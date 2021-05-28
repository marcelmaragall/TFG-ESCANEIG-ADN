import { TestBed } from '@angular/core/testing';

import { ProcessamentService } from './processament.service';

describe('ProcessamentService', () => {
  let service: ProcessamentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProcessamentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
