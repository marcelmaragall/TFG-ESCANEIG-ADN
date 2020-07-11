import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SequenciacioDetallComponent } from './sequenciacio-detall.component';

describe('SequenciacioDetallComponent', () => {
  let component: SequenciacioDetallComponent;
  let fixture: ComponentFixture<SequenciacioDetallComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SequenciacioDetallComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SequenciacioDetallComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
