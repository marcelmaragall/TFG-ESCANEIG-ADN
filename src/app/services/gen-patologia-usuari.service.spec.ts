import { TestBed } from '@angular/core/testing';

import { GenPatologiaUsuariService } from './gen-patologia-usuari.service';

describe('GenPatologiaUsuariService', () => {
  let service: GenPatologiaUsuariService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GenPatologiaUsuariService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
