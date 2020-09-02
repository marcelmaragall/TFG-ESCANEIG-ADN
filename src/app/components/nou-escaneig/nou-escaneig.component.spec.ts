import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NouEscaneigComponent } from './nou-escaneig.component';

describe('NouEscaneigComponent', () => {
  let component: NouEscaneigComponent;
  let fixture: ComponentFixture<NouEscaneigComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NouEscaneigComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NouEscaneigComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
