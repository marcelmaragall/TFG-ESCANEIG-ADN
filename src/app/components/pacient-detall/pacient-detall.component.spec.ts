import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PacientDetallComponent } from './pacient-detall.component';

describe('PacientDetallComponent', () => {
  let component: PacientDetallComponent;
  let fixture: ComponentFixture<PacientDetallComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PacientDetallComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PacientDetallComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
