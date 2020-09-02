import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SequenciaFormComponent } from './sequencia-form.component';

describe('SequenciaFormComponent', () => {
  let component: SequenciaFormComponent;
  let fixture: ComponentFixture<SequenciaFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SequenciaFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SequenciaFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
