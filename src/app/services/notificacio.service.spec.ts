import { TestBed } from '@angular/core/testing';

import { NotificacioService } from './notificacio.service';

describe('NotificacioService', () => {
  let service: NotificacioService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NotificacioService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
