import { TestBed } from '@angular/core/testing';

import { SequenciacioService } from './sequenciacio.service';

describe('SequenciacioService', () => {
  let service: SequenciacioService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SequenciacioService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
