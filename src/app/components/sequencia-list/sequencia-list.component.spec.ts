import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SequenciaListComponent } from './sequencia-list.component';

describe('SequenciaListComponent', () => {
  let component: SequenciaListComponent;
  let fixture: ComponentFixture<SequenciaListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SequenciaListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SequenciaListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
