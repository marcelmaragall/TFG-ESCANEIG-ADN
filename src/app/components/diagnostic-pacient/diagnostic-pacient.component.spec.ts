import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DiagnosticPacientComponent } from './diagnostic-pacient.component';

describe('DiagnosticPacientComponent', () => {
  let component: DiagnosticPacientComponent;
  let fixture: ComponentFixture<DiagnosticPacientComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DiagnosticPacientComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DiagnosticPacientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
