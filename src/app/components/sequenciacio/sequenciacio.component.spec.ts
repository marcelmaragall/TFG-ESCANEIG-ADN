import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SequenciacioComponent } from './sequenciacio.component';

describe('SequenciacioComponent', () => {
  let component: SequenciacioComponent;
  let fixture: ComponentFixture<SequenciacioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SequenciacioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SequenciacioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
