import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PatologiaDetallComponent } from './patologia-detall.component';

describe('PatologiaDetallComponent', () => {
  let component: PatologiaDetallComponent;
  let fixture: ComponentFixture<PatologiaDetallComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PatologiaDetallComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PatologiaDetallComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
